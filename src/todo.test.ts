// src/todo.test.ts
import { getFakeTask } from './todo-app';

describe('Todoロジックのバグ（仕様）テスト', () => {
    const mockQuotes = ['牛乳', 'パン', 'たまご'];

    test('getFakeTaskは、配列の中にある文字をランダムに返すこと', () => {
        const result = getFakeTask(mockQuotes);
        expect(mockQuotes).toContain(result);
    });

    test('getFakeTaskは、ランダムに選択する（Math.randomをモック）', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        const result = getFakeTask(mockQuotes);
        expect(result).toBe('パン');

        jest.restoreAllMocks();
    });

    test('getFakeTaskは、配列の全要素が選ばれる可能性がある', () => {
        const results = new Set<string>();

        [0.1, 0.4, 0.7].forEach((mockValue) => {
            jest.spyOn(Math, 'random').mockReturnValue(mockValue);
            results.add(getFakeTask(mockQuotes));
            jest.restoreAllMocks();
        });

        expect(results.size).toBe(3);
        expect([...results]).toEqual(expect.arrayContaining(mockQuotes));
    });

    test('getFakeTaskは、空配列でもエラーにならない（バグ仕様）', () => {
        const result = getFakeTask([]);
        expect(result).toBeUndefined();
    });

    test('getFakeTaskは、文字列を返す', () => {
        const result = getFakeTask(mockQuotes);
        expect(typeof result).toBe('string');
    });
});
