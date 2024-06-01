import { test, describe, expect } from 'vitest'
import { queryStolenAPI } from '@/utils'

describe('Query Stolen API', () => {
  test('safe scooter', async () => {
    const { id, isStolen, type } = await queryStolenAPI('505-LRP')
    expect(id).toBe('505-LRP')
    expect(isStolen).toBeFalsy()
    expect(type).toBeUndefined()
  })

  test('stolen scooter', async () => {
    const { id, isStolen, type } = await queryStolenAPI('JFC-961')
    expect(id).toBe('JFC-961')
    expect(isStolen).toBeTruthy()
    expect(type).toBe('重機車')
  })

  test('stolen car', async () => {
    const { id, isStolen, type } = await queryStolenAPI('1958-ZE')
    expect(id).toBe('1958-ZE')
    expect(isStolen).toBeTruthy()
    expect(type).toBe('汽車')
  })
})
