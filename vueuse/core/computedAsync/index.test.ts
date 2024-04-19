import { computed, nextTick, ref } from 'vue-demi'
import { promiseTimeout } from '@vueuse/shared'
import { describe, expect, it, vi } from 'vitest'
import { asyncComputed, computedAsync } from '.'

// 使用 describe 函数来定义一个测试组
describe('computed', () => {
	// 使用 it 函数定义了一个测试用例
	it('is lazy', () => {
		// 用 vi.fn 来创建一个模拟函数
		const func = vi.fn(() => 'data')
		const data = computed(func)

		// 使用了 expect 断言来验证函数 func 没有被调用过。这个断言用来确保 computed 函数确实是“惰性”的，即在调用 computed 时并不立即计算 func 的值。
		expect(func).not.toBeCalled()

		expect(data.value).toBe('data')

		expect(func).toBeCalledTimes(1)
	})
})

describe('computedAsync', () => {
	it('export module', () => {
		expect(computedAsync).toBeDefined()
		expect(asyncComputed).toBeDefined()
	})

	it('is not lazy by default', async () => {
		const func = vi.fn(() => Promise.resolve('data'))

		const data = computedAsync(func)

		expect(func).toBeCalledTimes(1)

		expect(data.value).toBeUndefined()

		await promiseTimeout(10)

		expect(data.value).toBe('data')
	})

	it('call onError when error is thrown', async () => {
		let errorMessage
		const func = vi.fn(async () => {
			throw new Error('An Error Message')
		})

		const data = computedAsync(func, undefined, {
			onError(e) {
				if (e instanceof Error) errorMessage = e.message
			},
		})

		expect(func).toBeCalledTimes(1)

		expect(data.value).toBeUndefined()

		await promiseTimeout(10)

		expect(data.value).toBeUndefined()
		expect(errorMessage).toBe('An Error Message')
	})

	it('is lazy if configured', async () => {
		const func = vi.fn(async () => 'data')

		const data = computedAsync(func, undefined, { lazy: true })

		expect(func).not.toBeCalled()

		// Act
		expect(data.value).toBeUndefined()

		await promiseTimeout(10)

		// Assert
		expect(func).toBeCalledTimes(1)
		expect(data.value).toBe('data')
	})

	it('re-computes when dependency changes', async () => {
		const counter = ref(1)
		const double = computedAsync(() => {
			const result = counter.value * 2
			return Promise.resolve(result)
		})

		expect(double.value).toBeUndefined()

		await nextTick()

		expect(double.value).toBe(2)

		counter.value = 2
		expect(double.value).toBe(2)

		await nextTick()
		await nextTick()

		expect(double.value).toBe(4)
	})

	it('uses last result', async () => {
		const evaluating = ref(false)
		const resolutions: Array<() => void> = []

		const counter = ref(1)
		const double = computedAsync(
			() => {
				const result = counter.value * 2
				return new Promise((resolve) =>
					resolutions.push(() => resolve(result))
				)
			},
			undefined,
			evaluating
		)

		await nextTick()

		expect(double.value).toBeUndefined()
		expect(evaluating.value).toBe(true)
		expect(resolutions).toHaveLength(1)

		resolutions[0]()
		await nextTick()
		await nextTick()

		expect(double.value).toBe(2)
		expect(evaluating.value).toBe(false)

		counter.value = 2
		await nextTick()
		counter.value = 3
		await nextTick()
		counter.value = 4
		await nextTick()

		expect(evaluating.value).toBe(true)
		expect(resolutions).toHaveLength(4)

		resolutions[1]()
		await nextTick()
		await nextTick()

		expect(evaluating.value).toBe(true)
		expect(double.value).toBe(2)

		resolutions[3]()
		await nextTick()
		await nextTick()

		expect(evaluating.value).toBe(false)
		expect(double.value).toBe(8)

		resolutions[2]()
		await nextTick()
		await nextTick()

		expect(evaluating.value).toBe(false)
		expect(double.value).toBe(8)
	})

	// it('evaluating works', async () => {
	//   const evaluating = ref(false)

	//   const data = computedAsync(
	//     () => new Promise(resolve => setTimeout(() => resolve('data'), 0)),
	//     undefined,
	//     evaluating,
	//   )

	//   await nextTick()
	//   expect(data.value).toBeUndefined()
	//   expect(evaluating.value).toBe(true)

	//   await new Promise(resolve => setTimeout(resolve, 0))

	//   expect(evaluating.value).toBe(false)
	//   expect(data.value).toBe('data')
	// })

	// it('triggers', async () => {
	//   const counter = ref(1)
	//   const double = computedAsync(() => {
	//     const result = counter.value * 2
	//     return Promise.resolve(result)
	//   })
	//   const other = computed(() => {
	//     return double.value + 1
	//   })

	//   expect(double.value).toBeUndefined()

	//   await nextTick()
	//   await nextTick()

	//   expect(double.value).toBe(2)

	//   counter.value = 2
	//   expect(double.value).toBe(2)
	//   expect(other.value).toBe(3)

	//   await nextTick()
	//   await nextTick()

	//   expect(double.value).toBe(4)
	//   expect(other.value).toBe(5)
	// })

	// it('cancel is called', async () => {
	//   const onCancel = vi.fn()
	//   const evaluating = ref(false)

	//   const data = ref('initial')
	//   const uppercase = computedAsync((cancel) => {
	//     cancel(onCancel)

	//     const uppercased = data.value.toUpperCase()

	//     return new Promise((resolve) => {
	//       setTimeout(resolve.bind(null, uppercased), 5)
	//     })
	//   }, '', evaluating)

	//   expect(uppercase.value).toBe('')

	//   await promiseTimeout(10)

	//   expect(uppercase.value).toBe('INITIAL')

	//   data.value = 'to be cancelled'
	//   await nextTick()
	//   await nextTick()
	//   expect(onCancel).toBeCalledTimes(0)

	//   data.value = 'final'
	//   await nextTick()
	//   await nextTick()
	//   expect(onCancel).toBeCalledTimes(1)

	//   await promiseTimeout(10)

	//   expect(uppercase.value).toBe('FINAL')
	// })

	// it('cancel is called for lazy', async () => {
	//   const onCancel = vi.fn()

	//   const data = ref('initial')
	//   const uppercase = computedAsync((cancel) => {
	//     cancel(() => onCancel())

	//     const uppercased = data.value.toUpperCase()

	//     return new Promise((resolve) => {
	//       setTimeout(resolve.bind(null, uppercased), 5)
	//     })
	//   }, '', { lazy: true })

	//   expect(uppercase.value).toBe('')

	//   await promiseTimeout(10)

	//   expect(uppercase.value).toBe('INITIAL')

	//   data.value = 'to be cancelled'
	//   await nextTick()
	//   await nextTick()
	//   expect(onCancel).toBeCalledTimes(0)

	//   data.value = 'final'
	//   await nextTick()
	//   await nextTick()
	//   expect(onCancel).toBeCalledTimes(1)

	//   await promiseTimeout(10)

	//   expect(uppercase.value).toBe('FINAL')
	// })
})
