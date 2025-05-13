---
layout: default
title: Modern C++
permalink: /modern/
---

# Cheatsheet 3: Modern C++ & Advanced Topics

## 1. Smart Pointers (`<memory>`, C++11)
*Manage dynamic memory automatically, preventing leaks (RAII).*

### `std::unique_ptr<T, Deleter=std::default_delete<T>>`
*Exclusive ownership; cannot be copied, only moved.*
* **Creation:**
    * `std::unique_ptr<MyClass> p1 = std::make_unique<MyClass>(ctor_arg1, ctor_arg2);` (C++14, preferred)
    * `std::unique_ptr<MyClass> p2(new MyClass());` (C++11)
    * `std::unique_ptr<MyClass[]> p_array = std::make_unique<MyClass[]>(size);` (C++14, for arrays)
* **Usage:**
    * `p1->method();` or `(*p1).member;`
    * `MyClass* raw_ptr = p1.get();` (Access raw pointer, but `unique_ptr` still owns it)
    * `p1.reset(new_my_class_ptr);` or `p1.reset();` (Releases old, takes ownership of new, or becomes empty)
    * `MyClass* raw_ptr_released = p1.release();` (Relinquishes ownership, returns raw pointer)
    * `if (p1) { /* p1 is not empty */ }` or `if (p1 != nullptr) { /* ... */ }`
* **Move:** `std::unique_ptr<MyClass> p3 = std::move(p1);` (`p1` becomes empty)

### `std::shared_ptr<T>`
*Shared ownership; uses reference counting. Object deleted when last `shared_ptr` is destroyed/reset.*
* **Creation:**
    * `std::shared_ptr<MyClass> sp1 = std::make_shared<MyClass>(ctor_arg1, ctor_arg2);` (Preferred, efficient)
    * `std::shared_ptr<MyClass> sp2(new MyClass());`
    * `std::shared_ptr<MyClass> sp_array(new MyClass[size], std::default_delete<MyClass[]>());` (For arrays, custom deleter needed)
* **Usage:**
    * `sp1->method();` or `(*sp1).member;`
    * `MyClass* raw_ptr = sp1.get();`
    * `sp1.reset(new_my_class_ptr);` or `sp1.reset();`
    * `long count = sp1.use_count();` (Number of `shared_ptr`s owning the object)
    * `if (sp1) { /* sp1 is not empty */ }`
* **Copy/Assign:** `std::shared_ptr<MyClass> sp3 = sp1;` (Increments reference count)

### `std::weak_ptr<T>`
*Non-owning ("weak") reference to an object managed by `std::shared_ptr`. Used to break circular dependencies.*
* **Creation:** `std::weak_ptr<MyClass> wp1 = sp1;` (From a `shared_ptr`)
* **Usage:**
    * `if (std::shared_ptr<MyClass> locked_sp = wp1.lock()) { locked_sp->method(); }` (Atomically create `shared_ptr` if object still exists)
    * `bool expired = wp1.expired();` (Checks if the pointed-to object has been deleted)
    * `long count = wp1.use_count();` (Number of `shared_ptr`s owning the object, 0 if expired)

## 2. Lambda Expressions (C++11)
*Anonymous functions, can be defined inline.*
* **Syntax:** `[capture_clause](parameters) mutable_spec exception_spec -> return_type { body }`
    * `mutable_spec`: `mutable` (if lambda modifies captured-by-copy variables)
    * `exception_spec`: `noexcept`, `throw(...)`
    * `-> return_type`: Optional if return type can be deduced by compiler.
* **Capture Clause:**
    * `[]`: Capture nothing.
    * `[=]`: Capture all automatic variables by copy.
    * `[&]`: Capture all automatic variables by reference.
    * `[this]`: Capture `this` pointer by copy.
    * `[var1, &var2]`: Capture `var1` by copy, `var2` by reference.
    * `[=, &var1]`: Capture `var1` by reference, others by copy.
    * `[&, var1]`: Capture `var1` by copy, others by reference.
    * `[val = 10] { /* ... */ }` (Init-capture, C++14: `val` is a new variable in lambda scope)
* **Examples:**
    * `auto sum = [](int a, int b) -> int { return a + b; }; int result = sum(5, 3);`
    * `int x = 10; auto add_x = [x](int y) { return x + y; };`
    * `std::for_each(v.begin(), v.end(), [](int& val){ val *= 2; });`

## 3. Type Inference (C++11)

### `auto`
*Deduces the type of a variable from its initializer.*
* `auto i = 42;` (deduced as `int`)
* `auto d = 3.14;` (deduced as `double`)
* `auto s = "hello";` (deduced as `const char*`, use `std::string s = "hello"; auto s_obj = s;` for `std::string`)
* `auto it = my_vector.begin();` (deduced as `std::vector<T>::iterator`)
* **With references/const:**
    * `auto& ref = var;`
    * `const auto& const_ref = var;`
    * `auto* ptr = &var;`

### `decltype(expression)`
*Determines the declared type of an entity or expression.*
* `int x = 0; decltype(x) y;` (`y` is `int`)
* `decltype(obj.method()) z = obj.method();` (`z` has the type returned by `obj.method()`)
* `decltype((x)) ref_x = x;` (`ref_x` is `int&` because `(x)` is an lvalue expression)

## 4. `nullptr` (C++11)
*A keyword representing a null pointer constant. Type-safe alternative to `NULL` or `0`.*
* `int* ptr1 = nullptr;`
* `void (*func_ptr)() = nullptr;`
* `if (ptr1 == nullptr) { /* ... */ }`

## 5. Initializer Lists (`<initializer_list>`, C++11)
*A lightweight way to represent a list of values.*
* `std::vector<int> v = {1, 2, 3, 4, 5};` (Container initialization)
* `MyClass obj {arg1, arg2};` (Aggregate/constructor initialization)
* `void print_all(std::initializer_list<int> vals) { for(int v : vals) std::cout << v << " "; }`
    * `print_all({10, 20, 30});`

## 6. Structured Bindings (C++17)
*Allows decomposing objects like tuples, pairs, structs, and arrays into individual variables.*
* **With `std::pair`:** `std::pair<int, std::string> p = {1, "text"}; auto [id, name] = p;`
* **With `std::tuple`:** `std::tuple<int, double, char> t = {1, 2.5, 'a'}; auto& [i, d, c] = t;`
* **With `struct/class` (public data members):**
    ```cpp
    struct Point { int x; int y; };
    Point pt = {10, 20};
    auto [px, py] = pt;
    ```
* **With arrays:** `int arr[] = {1,2,3}; auto [a,b,c] = arr;`

## 7. `if constexpr (condition)` (C++17)
*Compile-time conditional compilation. The `condition` must be a `constexpr` boolean.*
* ```cpp
  template <typename T>
  auto get_value(T t) {
      if constexpr (std::is_pointer_v<T>) {
          return *t; // Dereference if T is a pointer
      } else {
          return t;  // Return as is otherwise
      }
  }
  ```
## 8. Attributes (C++11 & later)
*Standardized way to provide hints/information to the compiler.*
* `[[nodiscard]] T func();` (Warn if return value is unused, C++17)
    * `[[nodiscard("Reason why it should not be discarded")]] T func();` (C++20)
* `[[deprecated]] void old_func();` (Warn if `old_func` is used, C++14)
* `[[deprecated("Use new_func instead.")]] void old_func();` (With reason, C++14)
* `[[fallthrough]];` (Indicates intentional fallthrough in a `switch` case, C++17)
* `[[maybe_unused]] int var;` (Suppresses unused variable warnings, C++17)
* `[[likely]]` / `[[unlikely]]` (Hint for branch prediction, C++20)

## 9. `std::optional<T>` (C++17, `<optional>`)
*Represents an optional value; either contains a `T` or is empty (nullopt).*
* `std::optional<int> opt_val;` (Initially empty)
* `std::optional<std::string> opt_str = "hello";`
* `opt_val = 10;`
* **Checking for value:**
    * `if (opt_val.has_value()) { /* ... */ }`
    * `if (opt_val) { /* ... */ }`
* **Accessing value:**
    * `int val = opt_val.value();` (Throws `std::bad_optional_access` if empty)
    * `int val = *opt_val;` (UB if empty)
    * `int val_or_default = opt_val.value_or(0);`
* **Resetting:**
    * `opt_val.reset();`
    * `opt_val = std::nullopt;`

## 10. `std::variant<Types...>` (C++17, `<variant>`)
*A type-safe union. Holds a value of one of its specified alternative types at any time.*
* `std::variant<int, std::string, double> v = 10;`
* `v = "hello";`
* **Accessing value:**
    * `int i = std::get<int>(v);` (Throws `std::bad_variant_access` if `v` doesn't hold `int`)
    * `std::string* s_ptr = std::get_if<std::string>(&v); if(s_ptr) { /* use *s_ptr */ }`
* **Checking active type:** `if (std::holds_alternative<std::string>(v)) { /* ... */ }`
* **Getting index:** `size_t index = v.index();`
* **Visiting:** `std::visit([](auto&& arg){ /* use arg */ }, my_variant);`

## 11. `std::any` (C++17, `<any>`)
*A type-safe container for single values of any type.*
* `std::any a = 1;`
* `a = std::string("hello");`
* `a = MyClass();`
* **Checking contained type:** `if (a.type() == typeid(std::string)) { /* ... */ }`
* **Accessing value:**
    * `std::string s = std::any_cast<std::string>(a);` (Throws `std::bad_any_cast` if type mismatch)
    * `std::string* s_ptr = std::any_cast<std::string>(&a); if(s_ptr) { /* ... */ }`
* **Resetting:**
    * `a.reset();`
    * `a.emplace<NewType>(args...);`

## 12. Templates (Brief Overview)

### Function Templates
*Define a generic function that can operate on different data types.*
* `template <typename T> T max_val(T a, T b) { return (a > b) ? a : b; }`
    * `int m1 = max_val(3, 7); double m2 = max_val(3.14, 2.71);`
    * `auto m3 = max_val<double>(5, 4.3);` (Explicit type)

### Class Templates
*Define a generic class.*
* `template <class T, int Size> class Array { T data[Size]; public: T get(int i){ return data[i];} };`
    * `Array<int, 10> intArray; Array<double, 5> doubleArray;`

### Variadic Templates (C++11)
*Templates that can take a variable number of arguments.*
* `template<typename T, typename... Args> void my_printf(const T& format, Args... args);`
    * (Recursive base case for variadic functions is common: `void my_printf(const T& format) {}`)

## 13. Move Semantics & Rvalue References (C++11)

### Rvalue Reference (`&&`)
*Binds to temporary objects (rvalues) or objects explicitly cast using `std::move`.*
* `void process(MyType&& rval_ref);` (Function can "steal" resources from `rval_ref`)

### `std::move(object)` (`<utility>`)
*Unconditionally casts `object` to an rvalue reference. Does not move anything itself.*
* `MyType new_obj = std::move(old_obj);` (Enables `old_obj` to be moved from by `new_obj`'s move constructor)
* Use when `old_obj` is no longer needed in its current state.

### Move Constructor & Move Assignment Operator
*Special member functions that transfer resources from a source object to `this` object, leaving the source in a valid but unspecified (often empty) state.*
* `MyClass(MyClass&& other) noexcept { /* transfer resources from other to this */ }`
* `MyClass& operator=(MyClass&& other) noexcept { /* transfer resources */ return *this; }`

## 14. Concurrency (Basics, C++11)

### `std::thread` (`<thread>`)
* `void task(int id); std::thread t1(task, 1);`
* `t1.join();` (Wait for thread `t1` to finish)
* `t1.detach();` (Allow `t1` to run independently; ensure `t1` outlives resources it uses)
* `std::this_thread::get_id(); std::this_thread::sleep_for(std::chrono::milliseconds(100));`

### `std::mutex` (`<mutex>`)
*Mutual exclusion primitive to protect shared data.*
* `std::mutex mtx; mtx.lock(); /* critical section */ mtx.unlock();`
* **RAII Wrappers:**
    * `std::lock_guard<std::mutex> guard(mtx); /* critical section (lock acquired, auto-released) */`
    * `std::unique_lock<std::mutex> u_lock(mtx); /* ... */ u_lock.unlock(); u_lock.lock();` (More flexible)
    * `std::scoped_lock lock(mtx1, mtx2);` (Locks multiple mutexes deadlock-free, C++17)

### `std::atomic<T>` (`<atomic>`)
*Provides atomic operations on type `T` (e.g., `int`, `bool`, pointers).*
* `std::atomic<int> counter = 0;`
* `counter++;` or `counter.fetch_add(1);`
* `int val = counter.load();`
* `counter.store(10);`
* `bool expected = false; if (counter.compare_exchange_strong(expected, true)) { /* success */ }`

### `std::async` & `std::future` (`<future>`)
*Run functions asynchronously and get their results.*
* `std::future<int> fut = std::async(std::launch::async, [](){ return 42; });`
* `int result = fut.get();` (Waits for the task to complete and retrieves the result or rethrows exception)
* `fut.wait();` or `fut.wait_for(std::chrono::seconds(1));`

### `std::condition_variable` (`<condition_variable>`)
*Synchronization primitive to block one or more threads until a condition is met or notified.*
* `std::condition_variable cv; std::unique_lock<std::mutex> lock(mtx);`
* `cv.wait(lock, []{ return /* condition_is_true */; });` (Releases lock, waits, reacquires lock)
* `cv.notify_one();` (Wakes one waiting thread)
* `cv.notify_all();` (Wakes all waiting threads)

## 15. Bit Manipulation
*Direct operations on the binary representation of data.*
* **Operators:** `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift)
* **Set bit `n` (0-indexed):** `number |= (1U << n);`
* **Clear bit `n`:** `number &= ~(1U << n);`
* **Toggle bit `n`:** `number ^= (1U << n);`
* **Check bit `n`:** `bool is_set = (number >> n) & 1U;`
* **Create mask for lowest `n` bits:** `unsigned int mask = (1U << n) - 1;`
* **Isolate lowest set bit:** `int lsb = number & -number;` or `int lsb = number & (~number + 1);` (for signed integers)

## 16. Memory Management Principles

### RAII (Resource Acquisition Is Initialization)
*Bind the lifetime of a resource (memory, file handles, locks, etc.) to the lifetime of an object.*
* Smart pointers (`std::unique_ptr`, `std::shared_ptr`) are prime examples.
* `std::lock_guard`, `std::fstream` also follow RAII.

### Rule of Three/Five/Zero (Class Design)
*If a class manages a raw resource (e.g., raw pointer doing `new`/`delete`), it likely needs:
    * **Rule of Three (Pre-C++11):**
        1. Copy Constructor
        2. Copy Assignment Operator
        3. Destructor
    * **Rule of Five (C++11 onwards):**
        1. Copy Constructor
        2. Copy Assignment Operator
        3. Move Constructor
        4. Move Assignment Operator
        5. Destructor
    * **Rule of Zero:** If your class does not directly manage resources (uses RAII types like `std::vector`, `std::string`, smart pointers for all owned resources), then you often don't need to define any of these special member functions. The compiler-generated ones will usually do the right thing.

## 17. Keywords (Modern C++ Focus - many covered above)
`alignas` (C++11), `alignof` (C++11), `auto` (type deduction C++11), `char16_t` (C++11), `char32_t` (C++11), `concept` (C++20), `consteval` (C++20), `constexpr` (C++11), `constinit` (C++20), `co_await` (C++20), `co_return` (C++20), `co_yield` (C++20), `decltype` (C++11), `final` (on class/virtual method C++11), `import` (C++20 modules), `module` (C++20 modules), `noexcept` (C++11), `nullptr` (C++11), `override` (on virtual method C++11), `requires` (C++20 concepts), `static_assert` (C++11), `thread_local` (C++11).