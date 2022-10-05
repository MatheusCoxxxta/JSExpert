const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const assert = require("assert");

/**
 * Fibonacci: o próximo valor corresponde à soma dos dois anteriores
 */
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    /**
     * generators retornam iterators, (.next)
     * existem três formas de ler os dados:
     * 1. Usando as funções .next
     * 2. for await
     * 3. rest/spread
     */

    // for await
    for await (const i of fibonacci.execute(3));

    const expectedCallCount = 4;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // rest/spread
    const [...results] = fibonacci.execute(5);

    const { args: paramsOnCall } = spy.getCall(2);

    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(paramsOnCall, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})();
