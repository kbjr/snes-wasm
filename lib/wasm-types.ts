
// 
// These types are borrowed straight from assemblyscript, to allow
// semantically referencing the specific types that go in and out of wasm
// 

declare type bool = boolean;
declare type i8 = number;
declare type i16 = number;
declare type i32 = number;
declare type isize = number;
declare type u8 = number;
declare type u16 = number;
declare type u32 = number;
declare type usize = number;
declare type f32 = number;
declare type f64 = number;



// This is just a 24-bit uint, used for pointers in the SNES
declare type u24 = i32;
