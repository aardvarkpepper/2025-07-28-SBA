// Your original array literal
const myArray = ["one", "two", "three"] as const;

// The type of 'myArray' will be inferred as a readonly tuple:
// type MyArrayType = readonly ["one", "two", "three"]
type MyArrayType = typeof myArray;

// You can also extract a union type of the elements:
// type MyElements = "one" | "two" | "three"
type MyElements = MyArrayType[number];

console.log("myArray:", myArray);
// console.log("MyArrayType:", MyArrayType); // Types cannot be logged at runtime
// console.log("MyElements:", MyElements);   // Types cannot be logged at runtime

// If you try to push to a 'readonly' array, TypeScript will give a compile-time error:
// myArray.push("four"); // Error: Property 'push' does not exist on type 'readonly ["one", "two", "three"]'.

const hamster: MyArrayType = ["one", "two", "three"];