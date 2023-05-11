// 选择排序：
// 初始时在未排序序列中找最小(最大)元素,放到序列的起始位置作为已排序序列;
// 然后再从剩余未排序元素中继续寻找最小(大)元素,放到已排序序列的末尾。
// 以此类推。知道所有元素均排序完毕。
function selectSort(arr) {
  // 当第 arr.length - 1 个数排好，意味着最后一个数也自然而然地确定下来
  // 同时 i 也表示了选择的次数
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
// 优化
// function selectSort(arr) {
//   if (arr?.length < 2) return arr;
//   for (let times = 0; times < arr.length - 1; times++) {
//     let tempIndex = times;
//     for (let index = times + 1; index < arr.length; index++) {
//       if (arr[tempIndex] > arr[index]) {
//         tempIndex = index;
//       }
//     }
//     if (tempIndex !== times) {
//       const tempValue = arr[times];
//       arr[times] = arr[tempIndex];
//       arr[tempIndex] = tempValue;
//     }
//   }
//   return arr;
// }
console.log("选择排序：", selectSort([4, 1, 5, 3, 98, 7]));
console.log("选择排序：", selectSort([1, 4, 35, 3, 2]));

// 冒泡排序
//     比较相邻的元素。如果第一个比第二个大,就交换他们;
//     对于每个相邻的元素重复相同的工作,知道最后一个元素,这样最后的元素会是最大的数
//     针对所有元素重复以上的步骤,除了最后一个元素
//     重复上面1~3步骤,知道排序结束
function bubbleSort(arr) {
  // t 表示次数
  for (let t = 0; t < arr.length - 1; t++) {
    for (let j = 0; j < arr.length - 1 - t; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log("冒泡排序：", bubbleSort([4, 1, 5, 3, 98, 7]));
console.log("冒泡排序：", bubbleSort([1, 4, 35, 3, 2]));

// 快速排序:
//         1. 从数列中取出一个数作为基数。
//         2. 重新排序数列,所有元素比基准值小的放到基准值前,所有元素比基准值大的放到其后。
//         3. 在对基准值左右区间,重复第二步,直到个区间只有一个数
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const midIndex = Math.floor(arr.length / 2);
  const [midValue] = arr.splice(midIndex, 1);
  const leftArr = [];
  const rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midValue) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return [...quickSort(leftArr), midValue, ...quickSort(rightArr)];
}
console.log("快速排序：", quickSort([4, 1, 5, 3, 98, 7]));
console.log("快速排序：", quickSort([1, 4, 35, 3, 2]));

// 插入排序
//      工作原理:是通过构建有序序列,对未排序数组,在已排序序列中从后向前扫描,找到相应位置并插入。
//      算法描述:
//          1. 从第一元素开始,该元素可以默认已经被排序
//          2. 取出下一个元素,在已经排序序列中从后向前扫描
//          3. 如果已排序的元素大于新元素,将该元素移到下一个位置
//          4.重复步骤3,直到找到已排序的元素小于或者等于新元素的位置
//          5.将新元素插入到该位置
//          6.重复2~5
function insertSort(arr) {
  // t 表示次数，同时也表示已经排好序的最后一个元素的index
  for (let t = 0; t < arr.length - 1; t++) {
    let i = t;
    const nextVal = arr[t + 1];
    while (i >= 0 && nextVal < arr[i]) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = nextVal;
  }
  return arr;
}
console.log("插入排序：", insertSort([4, 1, 5, 3, 98, 7]));
console.log("插入排序：", insertSort([1, 4, 35, 3, 2]));

// 希尔排序:    是对插入排序的改进,它与插入不同之处它会优先比较距离较远的元素
// 算法描述:
//      选择一个增量序列 t1,t2,...tk,其中ti>tj,tk=1;
//      按增量序列个数k,对序列进行k趟排序
//      每趟排序,根据对应的增量ti,将待排序列分割成若干长度为m的子序列,分别对各自表进行直接插入排序.当增量因子为一时,整个序列被分为一组,算法终止。
function ShellSort(arr) {
  var len = arr.length;
  var temp,
    gap = 1;
  while (gap <= len / 3) {
    gap = gap * 3 + 1; //生成增量
  }
  while (gap >= 1) {
    //当分组变成成1时则排序完成

    for (var i = gap; i < len; i++) {
      //按增量循环数组
      temp = arr[i];
      //增量大于零且前面的数组的值大于后面数组的值则交换位置
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
    console.log(gap);
    gap = (gap - 1) / 3; //递减增量
  }
  return arr;
}
