import { computed, ref, watchEffect, isRef } from 'vue-demi'
import type { Ref } from 'vue-demi'
import { noop } from '@vueuse/shared'

export interface AsyncComputedOptions {
	lazy?: boolean // 当 lazy 属性为 false 时，异步计算属性将会被立即执行
	onError?: (e: unknown) => void
	evaluating?: Ref<boolean> // 用于跟踪异步计算属性的计算状态, 通过使用 evaluating 属性，可以在组件中访问到异步计算属性的计算状态，并根据需要在 UI 中进行相应的显示或处理。
}

export const computedAsync = (
	fn: Function,
	initialState?,
	optionsOrRef?: Ref<boolean> | AsyncComputedOptions
) => {
	let options: AsyncComputedOptions

	if (isRef(optionsOrRef)) {
		options = { evaluating: optionsOrRef }
	} else {
		options = optionsOrRef || {}
	}

	const { onError = noop, lazy = false, evaluating = undefined } = options

	const current = ref(initialState)
	const started = ref(!lazy)
	let counter = 0

	watchEffect(async () => {
		if (!started.value) return

		counter++
		const counterAtBeginning = counter
		console.log(counter, counterAtBeginning)
		// if (evaluating) {
		// 	Promise.resolve().then(() => {
		// 		evaluating.value = true
		// 	})
		// }

		try {
			if (evaluating) {
				evaluating.value = true
			}
			const result = await fn()

			if (counterAtBeginning === counter) current.value = result
		} catch (error) {
			onError && onError(error)
		} finally {
			if (evaluating && counterAtBeginning === counter) {
				evaluating.value = false
			}
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
