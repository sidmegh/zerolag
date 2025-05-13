---
layout: default
title: Core C++ Fundamentals
permalink: /core/
---

# Core C++ Fundamentals

# Cheatsheet 1: C++ Core Language & Object-Oriented Programming

## 1. Basic Syntax & Data

### Variable Types & Modifiers
* **Integer Types:**
    * `char c = 'A';` (Typically 1 byte, stores characters or small integers)
    * `short s = 10;` (Short integer)
    * `int i = 100;` (Default integer type)
    * `long l = 1000L;` (Long integer)
    * `long long ll = 10000LL;` (Very long integer, C++11)
* **Floating-Point Types:**
    * `float f = 3.14f;` (Single-precision)
    * `double d = 3.14159;` (Double-precision)
    * `long double ld = 3.1415926535L;` (Extended-precision)
* **Boolean Type:**
    * `bool b = true;` or `bool b = false;`
* **Void Type:**
    * `void` (Represents absence of type, e.g., for functions not returning a value)
* **Modifiers:**
    * `signed int si;` (Can hold positive or negative values, default for int types)
    * `unsigned int ui;` (Can only hold non-negative values)
    * `const int CONST_VAL = 10;` (Value cannot be changed after initialization)
    * `volatile int v_val;` (Value may change unexpectedly, compiler optimizations bypassed)

### Literals
* **Integer:** `123` (decimal), `0123` (octal), `0xABC` (hexadecimal), `0b1010` (binary, C++14)
* **Floating-point:** `3.14`, `2.0f`, `0.1L`, `1.23e-5`
* **Character:** `'a'`, `'\n'` (newline), `'\x41'` (hex escape)
* **String:** `"Hello, World!"`, `R"(Raw string \n)"` (raw string literal, C++11)
* **Boolean:** `true`, `false`
* **Pointer:** `nullptr` (C++11)

### Operators (Common Examples)
* **Arithmetic:** `+`, `-`, `*`, `/`, `%` (modulo)
    * `int sum = a + b;`
* **Relational:** `==`, `!=`, `<`, `>`, `<=`, `>=`
    * `bool isEqual = (a == b);`
* **Logical:** `&&` (AND), `||` (OR), `!` (NOT)
    * `bool bothTrue = (cond1 && cond2);`
* **Bitwise:** `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift)
    * `int bits = val1 & val2;`
* **Assignment:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`
    * `count += 5;`
* **Ternary:** `condition ? expr_if_true : expr_if_false;`
    * `int max_val = (a > b) ? a : b;`
* **Increment/Decrement:** `++var` (pre), `var++` (post), `--var`, `var--`
* **`sizeof`:** `size_t s = sizeof(int);` or `size_t s = sizeof(variable);`
* **`typeid`:** `const std::type_info& info = typeid(variable_or_type);` (requires `<typeinfo>`)
* **Comma:** `int x = (a=1, b=2, a+b);` (evaluates left to right, result is rightmost)
* **Member Access:** `obj.member`, `ptr->member`
* **Scope Resolution:** `::` (e.g., `std::cout`, `MyClass::static_member`)

### Basic Input/Output (`<iostream>`)
* `std::cout << "Output: " << variable << std::endl;` (Standard output)
* `std::cin >> variable;` (Standard input)
* `std::cerr << "Error!" << std::endl;` (Standard error output, unbuffered)
* `std::clog << "Log message." << std::endl;` (Standard error output, buffered)

## 2. Control Flow

* **`if-else if-else`:**
    ```cpp
    if (condition1) { /* ... */ } else if (condition2) { /* ... */ } else { /* ... */ }
    ```
* **`switch`:**
    ```cpp
    switch (expression) { case val1: /* ... */ break; case val2: /* ... */ break; default: /* ... */ }
    ```
* **`for` loop:** `for (init; condition; increment) { /* ... */ }`
* **Range-based `for` loop (C++11):** `for (declaration : range_expression) { /* ... */ }`
    * `for (int x : myList) { std::cout << x; }`
* **`while` loop:** `while (condition) { /* ... */ }`
* **`do-while` loop:** `do { /* ... */ } while (condition);`
* **`break;`** (Exits the innermost loop or switch statement)
* **`continue;`** (Skips the current iteration of the innermost loop)
* **`goto label;`** (Unconditional jump - use with extreme caution) `label: /* ... */`

## 3. Functions

* **Declaration (Prototype):** `return_type function_name(parameter_list);`
    * `int add(int a, int b);`
* **Definition:** `return_type function_name(parameter_list) { /* body */ return value; }`
    * `int add(int a, int b) { return a + b; }`
* **Pass by Value:** `void func(int val) { val++; }` (original unchanged)
* **Pass by Reference:** `void func(int& ref) { ref++; }` (original modified)
* **Pass by Pointer:** `void func(int* ptr) { if(ptr) (*ptr)++; }` (original modified)
* **Default Arguments:** `void print(std::string msg, int level = 0);`
* **Function Overloading:**
    * `void display(int x);`
    * `void display(double y);`
    * `void display(const char* s);`
* **`inline` Hint:** `inline int square(int x) { return x * x; }` (request to compiler)
* **`main` Function:** `int main() { /* ... */ return 0; }` or `int main(int argc, char* argv[]) { /* ... */ }`

## 4. Classes & Structs (OOP Basics)

* **`class` Declaration:** `class MyClass { access_specifier: /* members */ };`
    * `class Dog { public: std::string name; void bark() { std::cout << "Woof!" << std::endl; } };`
* **`struct` Declaration:** `struct Point { int x; int y; };` (default access is `public`)
* **Member Variables:** `data_type member_name;`
* **Member Functions (Methods):** `return_type method_name(params) { /* ... */ }`
* **Access Specifiers:**
    * `public:` (Accessible from anywhere)
    * `private:` (Accessible only by members and friends of the class, default for `class`)
    * `protected:` (Accessible by members, friends, and derived classes)
* **Constructors:** (Special methods for object initialization)
    * **Default:** `MyClass() { /* ... */ }` (called with no arguments)
    * **Parameterized:** `MyClass(int val) : member_var(val) { /* ... */ }`
    * **Initializer List:** `MyClass(int x, int y) : x_coord(x), y_coord(y) {}`
* **Copy Constructor:** `MyClass(const MyClass& other) { /* copy members from other */ }`
* **Move Constructor (C++11):** `MyClass(MyClass&& other) noexcept { /* move resources from other */ }`
* **Destructor:** `~MyClass() { /* cleanup resources */ }` (called when object goes out of scope or is deleted)
* **`this` Pointer:** `this->member_var = member_var;` (pointer to the current object instance)
* **`static` Member Variables:** `static int object_count;` (shared among all instances)
    * Initialize outside class: `int MyClass::object_count = 0;`
* **`static` Member Functions:** `static void print_count() { std::cout << object_count; }` (can only access static members)
* **`const` Member Functions:** `int get_value() const { return member_var; }` (cannot modify non-static member variables)
* **Friend Function:** `friend void show_private_data(const MyClass& obj);` (can access private/protected members)
* **Friend Class:** `friend class AnotherClass;` (AnotherClass can access private/protected members)

## 5. Inheritance

* **Syntax:** `class Derived : access_specifier Base { /* ... */ };`
    * `class GoldenRetriever : public Dog { public: void fetch() { /* ... */ } };`
    * `public` inheritance: "is-a" relationship, public members of base are public in derived.
    * `protected` inheritance: public and protected members of base are protected in derived.
    * `private` inheritance: public and protected members of base are private in derived ("is-implemented-in-terms-of").
* **Virtual Functions (for Polymorphism):** `virtual return_type func_name(params);`
    * `virtual void makeSound() { std::cout << "Generic sound" << std::endl; }`
* **Pure Virtual Functions (Abstract Class):** `virtual return_type func_name(params) = 0;`
    * `class Shape { public: virtual double getArea() = 0; };` (Shape cannot be instantiated)
* **`override` Specifier (C++11):** `void makeSound() override { /* ... */ }` (ensures overriding a base class virtual function)
* **`final` Specifier (C++11):**
    * On class: `class Sealed final { /* ... */ };` (cannot be inherited from)
    * On virtual function: `virtual void myMethod() final;` (cannot be overridden in derived classes)
* **Constructor/Destructor Order:** Base constructors first, then derived. Derived destructor first, then base.
* **Accessing Base Class Members:** `Base::member_name;`

## 6. Polymorphism

* **Runtime Polymorphism:** Achieved using base class pointers/references to derived class objects and virtual functions.
    ```cpp
    // Dog* myDog = new GoldenRetriever();
    // myDog->makeSound(); // Calls GoldenRetriever's makeSound if it's virtual and overridden
    ```

## 7. Exception Handling (`<stdexcept>`)

* **`try-catch` Block:**
    ```cpp
    try {
        // Code that might throw an exception
        if (error_condition) throw std::runtime_error("Something went wrong!");
    } catch (const std::runtime_error& e) {
        std::cerr << "Runtime error: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Standard exception: " << e.what() << std::endl;
    } catch (...) { // Catches any other type of exception
        std::cerr << "An unknown exception occurred." << std::endl;
    }
    ```
* **`throw` Statement:** `throw expression;`
* **Standard Exception Classes:** `std::exception`, `std::logic_error`, `std::runtime_error`, `std::bad_alloc`, `std::out_of_range`, etc.
* **`noexcept` Specifier (C++11):** `void my_func() noexcept;` (promises the function won't throw)
    * `void my_func() noexcept(expression);` (conditionally noexcept)

## 8. Casting

* **`static_cast<new_type>(expression);`** (Compile-time cast, for related types e.g., numeric, pointers in hierarchy)
    * `double d = 3.14; int i = static_cast<int>(d);`
* **`dynamic_cast<new_type_ptr_or_ref>(expression_ptr_or_ref);`** (Runtime cast for polymorphic types, returns `nullptr` or throws `std::bad_cast` on failure)
    * `Base* b_ptr = new Derived(); Derived* d_ptr = dynamic_cast<Derived*>(b_ptr);`
* **`const_cast<new_type>(expression);`** (Used to add or remove `const` or `volatile` qualifiers)
    * `const int x = 10; int* p = const_cast<int*>(&x);` (Use with extreme caution)
* **`reinterpret_cast<new_type>(expression);`** (Low-level bitwise reinterpretation of types, highly platform-dependent)
    * `int i = 0x12345678; char* c_ptr = reinterpret_cast<char*>(&i);` (Use with extreme caution)
* **C-style Cast:** `(new_type)expression;` (Avoid in C++; prefers one of the above for clarity and safety)

## 9. Preprocessor Directives

* **`#include <header_name>`** (For standard library headers)
* **`#include "file_name.h"`** (For user-defined headers)
* **`#define IDENTIFIER replacement_text`** (Macro definition)
    * `#define PI 3.14159`
* **`#define FUNCTION_MACRO(param1, param2) ((param1) + (param2))`** (Function-like macro, use parentheses carefully)
* **Conditional Compilation:**
    * `#ifdef IDENTIFIER`
    * `#ifndef IDENTIFIER` (Often used for include guards: `#ifndef MY_HEADER_H \n #define MY_HEADER_H \n /* ... */ \n #endif`)
    * `#if constant_expression`
    * `#else`
    * `#elif constant_expression`
    * `#endif`
* **`#pragma directive_name`** (Compiler-specific directives)
    * `#pragma once` (Commonly used as an alternative to include guards)
* **`#undef IDENTIFIER`** (Undefines a macro)

## 10. Keywords (Fundamental - many covered above)

A selection of important keywords (not exhaustive):
`alignas` (C++11), `alignof` (C++11), `asm`, `auto` (type deduction C++11), `bool`, `break`, `case`, `catch`, `char`, `char16_t` (C++11), `char32_t` (C++11), `class`, `const`, `constexpr` (C++11), `const_cast`, `continue`, `decltype` (C++11), `default`, `delete`, `do`, `double`, `dynamic_cast`, `else`, `enum`, `explicit`, `export` (largely unused), `extern`, `false`, `final` (C++11), `float`, `for`, `friend`, `goto`, `if`, `inline`, `int`, `long`, `mutable`, `namespace`, `new`, `noexcept` (C++11), `nullptr` (C++11), `operator`, `override` (C++11), `private`, `protected`, `public`, `register` (deprecated C++17), `reinterpret_cast`, `return`, `short`, `signed`, `sizeof`, `static`, `static_assert` (C++11), `static_cast`, `struct`, `switch`, `template`, `this`, `thread_local` (C++11), `throw`, `true`, `try`, `typedef` (prefer `using` in modern C++), `typeid`, `typename`, `union`, `unsigned`, `using` (for directives, aliases C++11), `virtual`, `void`, `volatile`, `wchar_t`, `while`.