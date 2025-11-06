import { countExecutionTime } from "../../j4b1-assert.js";

function longComputation(fromNumber) {
  let result = fromNumber;

  for (let i = 0; i <= 100000; i++) {
    result += i;
  }

  return result;
}

const useMemo = (fnToMemoize) => {
    const memo = new Map();
    return (param) => {
        if(memo.has(param)){
            return memo.get(param);
        }
        const result = fnToMemoize(param)
        memo.set(param, result)
    }
}

const longComputationWithCache = useMemo(longComputation)

const executionTime1 = countExecutionTime(() => {
  longComputationWithCache(1000);
});
const executionTime2 = countExecutionTime(() => {
  longComputationWithCache(1000);
});
console.log(executionTime1);
console.log(executionTime2);