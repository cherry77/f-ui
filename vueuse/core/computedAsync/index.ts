import { ref, watchEffect, computed, Ref, isRef } from 'vue-demi'
import type { Fn } from '@vueuse/shared'

export type AsyncComputedOnCancel = (cancelCallback: Fn) => void

export interface AsyncComputedOptions {
	lazy?: boolean
	onError?: (e: unknown) => void
	evaluating?: Ref<boolean>
}

export function computedAsync<T>(
	evaluationCallback: (onCancel: AsyncComputedOnCancel) => Promise<T> | T,
	initialState?: T,
	optionsOrRef?: AsyncComputedOptions | Ref<boolean>
) {
	const current = ref(initialState)
	let options: AsyncComputedOptions

	if (isRef(optionsOrRef)) {
		options = { evaluating: optionsOrRef }
	} else {
		options = optionsOrRef || {}
	}

	const { lazy, onError, evaluating } = options
	const started = ref(!lazy)

	let counter = 0

	watchEffect(async (onInvalidate) => {
		if (!started.value) return

		counter++
		const counterAtBeginning = counter
		let hasFinished = false
		try {
			if (evaluating) evaluating.value = true

			const result = await evaluationCallback((cancelCallback) => {
				onInvalidate(() => {
					if (evaluating) evaluating.value = false

					if (!hasFinished) cancelCallback()
				})
			})
			if (counterAtBeginning === counter) {
				current.value = result
			}
		} catch (error) {
			onError && onError(error)
		} finally {
			if (evaluating && counterAtBeginning === counter) {
				evaluating.value = false
			}
			hasFinished = true
		}
	})

	if (lazy) {
		return computed(() => {
			started.value = true
			return current.value
		})
	} else {
		return current
	}
}

export const asyncComputed = () => {}
