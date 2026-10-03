
export interface Fourage {
    id: string,
    name: string,
    type: 'hay' | 'silage' | 'grass' | 'grain' | 'supplement' | 'other',
    suitableFor: string[]
}