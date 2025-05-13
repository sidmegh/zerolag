---
layout: default
title: STL
permalink: /stl/
---

# Cheatsheet 2: C++ Standard Library - Containers, Iterators, Algorithms & I/O

## 1. Common Standard Library Headers
* **Containers:** `<vector>`, `<string>`, `<deque>`, `<list>`, `<forward_list>`, `<array>`, `<map>`, `<set>`, `<unordered_map>`, `<unordered_set>`, `<queue>`, `<stack>`
* **Algorithms & Numeric:** `<algorithm>`, `<numeric>`, `<random>` (C++11)
* **I/O:** `<iostream>`, `<fstream>`, `<sstream>`, `<iomanip>`
* **Utilities:** `<utility>` (for `std::pair`, `std::move` etc.), `<memory>` (for smart pointers, but primarily Modern C++), `<functional>` (for `std::function`, comparators), `<iterator>`
* **String:** `<string>`, `<string_view>` (C++17)
* **Limits & Type Traits:** `<limits>`, `<type_traits>` (C++11)
* **Numerics:** `<cmath>`, `<complex>`
* **Exception Handling:** `<stdexcept>`
* **Time:** `<chrono>` (C++11)

## 2. Container Basics (General Operations)
*(Applies to most containers, `c` is a container instance)*
* **Constructors:** `ContainerType<T> c; ContainerType<T> c(other_c); ContainerType<T> c(size); ContainerType<T> c(size, val); ContainerType<T> c(iter_begin, iter_end);`
* **Size/Capacity:**
    * `bool empty = c.empty();`
    * `size_t s = c.size();`
    * `size_t ms = c.max_size();`
    * (`std::vector`, `std::string`, `std::deque` specific): `c.capacity(); c.reserve(n); c.shrink_to_fit();`
* **Element Access (varies by container):**
    * `T& front = c.front();` (not for `std::forward_list`, `std::set`, `std::map`)
    * `T& back = c.back();` (for `vector`, `string`, `deque`, `list`)
    * `T& val = c.at(index);` (`vector`, `string`, `deque`, `map`, `array` - with bounds checking)
    * `T& val = c[index];` (`vector`, `string`, `deque`, `map`, `array` - no bounds checking for sequence containers)
* **Modifiers:**
    * `c.clear();` (Removes all elements)
    * `iter = c.insert(pos_iter, val);` (many overloads)
    * `iter = c.erase(pos_iter);` or `iter = c.erase(begin_iter, end_iter);`
    * `c1.swap(c2);` or `std::swap(c1, c2);` (efficiently swaps content)
    * `iter = c.emplace(pos_iter, args...);` (constructs element in-place, C++11)
    * `c.emplace_back(args...);` (`vector`, `deque`, `list`, C++11)
    * `c.emplace_front(args...);` (`deque`, `list`, `forward_list`, C++11)
* **Comparison:** `c1 == c2`, `c1 != c2`, `c1 < c2`, etc. (lexicographical for sequence, element-wise for set/map)

## 3. Sequence Containers

### `std::vector<T, Allocator=std::allocator<T>>` (`<vector>`)
*Dynamic array, contiguous memory.*
* `v.push_back(val);` (Adds element to the end)
* `v.pop_back();` (Removes last element)
* `T* data_ptr = v.data();` (Direct pointer to underlying array, C++11)

### `std::string` (`<string>`)
*Sequence of characters, specialized `std::basic_string<char>`.*
* `s.append(str_or_char_ptr);` or `s += str_or_char_ptr;`
* `std::string sub = s.substr(pos, len = npos);`
* `size_t pos = s.find(str_or_char, start_pos = 0);` (`rfind`, `find_first_of`, `find_last_of`, etc.)
* `s.replace(pos, len, str_or_char_ptr);`
* `const char* cstr = s.c_str();` (Null-terminated C-style string)
* `size_t len = s.length();` (alias for `s.size()`)
* `std::getline(std::cin, my_string_var);` (Reads a line into string)
* Conversions (C++11, `<string>`): `std::to_string(num_val); int i = std::stoi(str); double d = std::stod(str);`

### `std::deque<T, Allocator=std::allocator<T>>` (`<deque>`)
*Double-ended queue, not necessarily contiguous.*
* `d.push_front(val);`
* `d.pop_front();`
* `d.push_back(val);`
* `d.pop_back();`

### `std::list<T, Allocator=std::allocator<T>>` (`<list>`)
*Doubly-linked list.*
* `l.push_front(val);`
* `l.pop_front();`
* `l.push_back(val);`
* `l.pop_back();`
* `l.sort();` or `l.sort(compare_func);`
* `l.merge(other_list);` (merges sorted lists)
* `l.splice(pos_iter, other_list_or_elements);`
* `l.remove(val);` or `l.remove_if(predicate);`
* `l.unique();` (removes consecutive duplicates)
* `l.reverse();`

### `std::forward_list<T, Allocator=std::allocator<T>>` (`<forward_list>`, C++11)
*Singly-linked list.*
* `fl.push_front(val);`
* `fl.pop_front();`
* `iter = fl.insert_after(pos_iter, val);`
* `iter = fl.erase_after(pos_iter);`
* (Similar methods to `std::list` where applicable, e.g., `sort`, `merge`, `unique`, `remove_if`)

### `std::array<T, N>` (`<array>`, C++11)
*Fixed-size array, stack-allocated if local and size is small.*
* `arr.fill(val);` (Assigns `val` to all elements)
* Access: `arr[i]`, `arr.at(i)`, `arr.front()`, `arr.back()`, `arr.data()`

## 4. Associative Containers (Ordered, based on Red-Black Trees)

### `std::map<Key, T, Compare=std::less<Key>, Allocator=...>` (`<map>`)
*Collection of key-value pairs, sorted by unique keys.*
* `mapped_type& val = m[key];` (Access/insert, `T` must be default-constructible)
* `iter_bool_pair = m.insert({key, val});` or `m.insert(std::make_pair(key, val));`
* `iter_bool_pair = m.emplace(key_args..., val_args...);` (C++11)
* `size_t num_erased = m.erase(key);`
* `iter it = m.find(key);` (Returns iterator to element or `m.end()`)
* `size_t c = m.count(key);` (0 or 1)
* `iter lb = m.lower_bound(key);` (Iterator to first element not less than key)
* `iter ub = m.upper_bound(key);` (Iterator to first element greater than key)
* `std::pair<iter,iter> range = m.equal_range(key);`

### `std::set<Key, Compare=std::less<Key>, Allocator=...>` (`<set>`)
*Collection of unique keys, sorted.*
* `iter_bool_pair = s.insert(key);`
* (Other operations similar to `std::map` for keys: `erase`, `find`, `count`, `lower_bound`, `upper_bound`, `equal_range`)

### `std::multimap<Key, T, ...>` & `std::multiset<Key, ...>`
*Allow duplicate keys, otherwise similar to `map` and `set`.*
* `mmap.insert({key, val});` (Can insert multiple items with the same key)
* `s.count(key);` (Can be > 1)

## 5. Unordered Associative Containers (Hashed, Average O(1)) (`C++11`)

### `std::unordered_map<Key, T, Hash=std::hash<Key>, Pred=std::equal_to<Key>, Alloc=...>` (`<unordered_map>`)
*Hashed key-value pairs, no specific order.*
* (API largely similar to `std::map`: `[]`, `at`, `insert`, `emplace`, `erase`, `find`, `count`)
* **Hash policy:**
    * `float lf = um.load_factor();`
    * `um.rehash(bucket_count);`
    * `um.reserve(num_elements);`

### `std::unordered_set<Key, Hash=..., Pred=..., Alloc=...>` (`<unordered_set>`)
*Hashed unique keys, no specific order.*
* (API largely similar to `std::set`)

### `std::unordered_multimap` & `std::unordered_multiset`
*Allow duplicate keys, hashed, no specific order.*

## 6. Container Adapters

### `std::stack<T, Container=std::deque<T>>` (`<stack>`)
*LIFO (Last-In, First-Out).*
* `stk.push(val);`
* `stk.pop();` (Removes top element, does not return it)
* `T& top_val = stk.top();` (Access top element)
* `bool e = stk.empty();`
* `size_t s = stk.size();`

### `std::queue<T, Container=std::deque<T>>` (`<queue>`)
*FIFO (First-In, First-Out).*
* `q.push(val);` (Adds to back)
* `q.pop();` (Removes from front)
* `T& front_val = q.front();`
* `T& back_val = q.back();`
* `bool e = q.empty();`
* `size_t s = q.size();`

### `std::priority_queue<T, Container=std::vector<T>, Compare=std::less<T>>` (`<queue>`)
*Element with highest priority (largest by default) is always at the top.*
* `pq.push(val);`
* `pq.pop();` (Removes top element)
* `const T& top_val = pq.top();` (Access top element)
* `pq.emplace(args...);`
* (To make a min-priority queue: `std::priority_queue<T, std::vector<T>, std::greater<T>> min_pq;`)

## 7. Iterators (`<iterator>`)
*Objects that point to elements in a container.*
* **Categories:** Input, Output, Forward, Bidirectional, Random Access, Contiguous (C++17)
* **Declaration:** `std::vector<int>::iterator it = my_vector.begin();`
* **Common Operations:**
    * `*it` (Dereference: access element)
    * `it->member` (Dereference and access member, if `it` points to an object)
    * `++it` (pre-increment), `it++` (post-increment) (move to next element)
    * `--it`, `it--` (for Bidirectional or Random Access)
    * `it1 == it2`, `it1 != it2`
    * `it + n`, `it - n`, `it += n`, `it -= n`, `it1 - it2` (for Random Access)
    * `it[n]` (equivalent to `*(it+n)` for Random Access)
* **Container Iterator Methods:**
    * `c.begin()`, `c.end()` (read-write iterators)
    * `c.cbegin()`, `c.cend()` (read-only iterators, C++11)
    * `c.rbegin()`, `c.rend()` (reverse read-write iterators)
    * `c.crbegin()`, `c.crend()` (reverse read-only iterators, C++11)
* **Iterator Helper Functions (`<iterator>`):**
    * `std::advance(it, n);` (Moves iterator `n` steps, handles different iterator categories)
    * `typename std::iterator_traits<Iter>::difference_type d = std::distance(first, last);`
    * `Iter next_it = std::next(it, n=1);` (C++11)
    * `Iter prev_it = std::prev(it, n=1);` (C++11)
    * `std::begin(container_or_array)`, `std::end(container_or_array)` (Generic free functions, C++11)

## 8. Standard Library Algorithms (`<algorithm>`, `<numeric>`)
*(Typically take iterators `begin` (inclusive) and `end` (exclusive) defining a range `[begin, end)`)*

### Non-Modifying Sequence Operations
* `iter it = std::find(begin, end, val);`
* `iter it = std::find_if(begin, end, predicate_func);`
* `iter it = std::find_if_not(begin, end, predicate_func);` (C++11)
* `count_type n = std::count(begin, end, val);`
* `count_type n = std::count_if(begin, end, predicate_func);`
* `T total = std::accumulate(begin, end, init_val);` (`<numeric>`)
* `T total = std::accumulate(begin, end, init_val, binary_op_func);` (`<numeric>`)
* `OutputIt std::for_each(begin, end, unary_func);` (Applies func to each element)
* `bool b = std::equal(begin1, end1, begin2);` (Compares two ranges)
* `std::pair<Iter1, Iter2> p = std::mismatch(begin1, end1, begin2);`
* `Iter it = std::search(hay_begin, hay_end, needle_begin, needle_end);` (Find sub-sequence)
* `bool b = std::all_of(begin, end, predicate);` (C++11)
* `bool b = std::any_of(begin, end, predicate);` (C++11)
* `bool b = std::none_of(begin, end, predicate);` (C++11)

### Min/Max Operations
* `const T& min_val = std::min(a, b);` or `std::min({a,b,c,...});` (C++11 for initializer list)
* `const T& max_val = std::max(a, b);` or `std::max({a,b,c,...});` (C++11 for initializer list)
* `std::pair<const T&, const T&> p = std::minmax(a, b);` (C++11)
* `Iter it = std::min_element(begin, end);` or `std::min_element(b,e,comp);`
* `Iter it = std::max_element(begin, end);` or `std::max_element(b,e,comp);`
* `std::pair<Iter,Iter> p = std::minmax_element(begin, end);` (C++11)

### Searching & Bounds (on sorted ranges)
* `Iter it = std::lower_bound(begin, end, val);` (First element not less than val)
* `Iter it = std::upper_bound(begin, end, val);` (First element greater than val)
* `std::pair<Iter,Iter> p = std::equal_range(begin, end, val);` (Range of elements equal to val)
* `bool found = std::binary_search(begin, end, val);`

### Modifying Sequence Operations
* `OutputIt std::copy(src_begin, src_end, dest_begin);`
* `OutputIt std::copy_if(src_begin, src_end, dest_begin, predicate);` (C++11)
* `OutputIt std::copy_n(src_begin, count, dest_begin);` (C++11)
* `OutputIt std::move(src_begin, src_end, dest_begin);` (C++11, moves elements)
* `OutputIt std::transform(src_begin, src_end, dest_begin, unary_op);`
* `OutputIt std::transform(src1_b, src1_e, src2_b, dest_b, binary_op);`
* `void std::fill(begin, end, val);`
* `void std::fill_n(begin, count, val);`
* `void std::generate(begin, end, generator_func);`
* `void std::generate_n(begin, count, generator_func);`
* `void std::replace(begin, end, old_val, new_val);`
* `void std::replace_if(begin, end, predicate, new_val);`
* `Iter new_end = std::remove(begin, end, val);` (Moves elements, returns new logical end. Use with `erase`.)
    * `v.erase(std::remove(v.begin(), v.end(), val_to_remove), v.end());` // Erase-remove idiom
* `Iter new_end = std::remove_if(begin, end, predicate);` (Use with `erase`.)
* `Iter new_end = std::unique(begin, end);` (Removes consecutive duplicates. Use with `erase`.)
* `void std::reverse(begin, end);`
* `void std::rotate(begin, middle, end);` (Rotates elements)
* `void std::shuffle(begin, end, random_engine);` (C++11, needs `<random>`)
* `void std::sample(begin, end, out_iter, n, random_engine);` (C++17, selects n random elements)

### Sorting & Partitioning
* `void std::sort(begin, end);` or `std::sort(b,e,compare_func);`
* `void std::stable_sort(begin, end);` (Preserves relative order of equal elements)
* `void std::partial_sort(begin, middle, end);` (Sorts range `[begin, middle)`)
* `OutputIt std::partial_sort_copy(src_b, src_e, dest_b, dest_e);`
* `void std::nth_element(begin, nth_pos_iter, end);` (Puts nth element in its sorted position)
* `Iter it = std::partition(begin, end, predicate);` (Elements satisfying predicate come first)
* `Iter it = std::stable_partition(begin, end, predicate);`
* `bool b = std::is_sorted(begin, end);` (C++11)
* `Iter it = std::is_sorted_until(begin, end);` (C++11)

### Set Operations (on sorted ranges)
* `OutputIt std::merge(b1,e1,b2,e2,dest_b);`
* `bool b = std::includes(b1,e1,b2,e2);`
* `OutputIt std::set_union(b1,e1,b2,e2,dest_b);`
* `OutputIt std::set_intersection(b1,e1,b2,e2,dest_b);`
* `OutputIt std::set_difference(b1,e1,b2,e2,dest_b);`
* `OutputIt std::set_symmetric_difference(b1,e1,b2,e2,dest_b);`

### Heap Operations
* `void std::make_heap(begin, end);` or `make_heap(b,e,comp);`
* `void std::push_heap(begin, end);` (Adds element at `end-1` to heap `[begin, end-1)`)
* `void std::pop_heap(begin, end);` (Moves largest from `begin` to `end-1`, makes `[begin, end-1)` a heap)
* `void std::sort_heap(begin, end);` (Sorts a heap range)
* `Iter it = std::is_heap_until(begin, end);` (C++11)
* `bool b = std::is_heap(begin, end);` (C++11)

### Numeric (`<numeric>`)
* `void std::iota(begin, end, start_val);` (Fills range with increasing values)
* `OutputIt std::partial_sum(src_b, src_e, dest_b);` (e.g., `d[i] = s[0] + ... + s[i]`)
* `T res = std::inner_product(b1,e1,b2,init_val);` (e.g., `init + (a[0]*b[0]) + ...`)
* `OutputIt std::adjacent_difference(src_b, src_e, dest_b);` (e.g., `d[i] = s[i] - s[i-1]`)

## 9. File I/O (`<fstream>`)

* **Classes:** `std::ifstream` (input), `std::ofstream` (output), `std::fstream` (input/output)
* **Opening a file:**
    * `std::ifstream fin("input.txt");` (Opens for reading)
    * `std::ofstream fout("output.txt", std::ios::out | std::ios::app);` (Opens for writing, append mode)
    * `std::fstream F; F.open("file.txt", std::ios::in | std::ios::out | std::ios::binary);`
* **Open Modes (`std::ios::mode`):**
    * `in` (read), `out` (write, truncates by default if file exists), `app` (append), `ate` (at end on open), `trunc` (truncate if exists), `binary`
* **Checking if open:** `if (fin.is_open()) { /* ... */ }` or `if (!fin) { /* error */ }`
* **Reading/Writing:**
    * `fin >> variable;`
    * `fout << data << std::endl;`
    * `std::getline(fin, line_string);`
    * `fout.write(char_ptr, num_bytes);` (binary output)
    * `fin.read(char_ptr, num_bytes);` (binary input)
* **Closing:** `fin.close();` (Often handled by destructor, but good practice for explicit control)
* **File Pointers (for binary or random access):**
    * `fin.seekg(offset, direction);` (e.g., `std::ios::beg`, `std::ios::cur`, `std::ios::end`)
    * `fout.seekp(offset, direction);`
    * `pos_type current_pos = fin.tellg();`
    * `pos_type current_pos = fout.tellp();`
* **Error checking:** `fin.good()`, `fin.bad()`, `fin.fail()`, `fin.eof()`

## 10. String Streams (`<sstream>`)
*Read from/write to strings as if they were streams.*
* **Classes:** `std::stringstream`, `std::istringstream` (input), `std::ostringstream` (output)
* **Usage:**
    ```cpp
    std::stringstream ss;
    ss << "Hello " << 42 << " world " << 3.14; // Writing to stringstream
    std::string s = ss.str(); // Get content as string: "Hello 42 world 3.14"
    ss.str(""); // Clear content
    ss.clear(); // Clear error flags (if any)
    
    std::string data = "123 abc";
    std::istringstream iss(data);
    int num; std::string word;
    iss >> num >> word; // num = 123, word = "abc"
    ```

## 11. Memory Manipulation (C-style, from `<cstring>`)
*Use with caution, prefer C++ containers and algorithms where possible.*
* `void* memset(void* ptr, int value, size_t num_bytes);` (Sets bytes to `(unsigned char)value`)
    * `char buffer[100]; std::memset(buffer, 0, sizeof(buffer));`
* `void* memcpy(void* dest, const void* src, size_t num_bytes);` (Undefined if regions overlap)
* `void* memmove(void* dest, const void* src, size_t num_bytes);` (Safe for overlapping regions)
* `int memcmp(const void* ptr1, const void* ptr2, size_t num_bytes);`

## 12. Math Functions (`<cmath>`)
*(Many functions are overloaded for `float`, `double`, `long double`)*
* **Trigonometric:** `sin(x)`, `cos(x)`, `tan(x)`, `asin(x)`, `acos(x)`, `atan(x)`, `atan2(y,x)`
* **Hyperbolic:** `sinh(x)`, `cosh(x)`, `tanh(x)`
* **Exponential & Logarithmic:** `exp(x)` ($e^x$), `log(x)` (natural log), `log10(x)` (base-10 log), `log2(x)` (C++11)
* **Power:** `pow(base, exp)`, `sqrt(x)`, `cbrt(x)` (cube root, C++11)
* **Rounding & Remainder:**
    * `ceil(x)` (smallest integer not less than x)
    * `floor(x)` (largest integer not greater than x)
    * `trunc(x)` (truncate towards zero, C++11)
    * `round(x)` (nearest integer, C++11)
    * `lround(x)`, `llround(x)` (return long/long long, C++11)
    * `fmod(x,y)` (floating-point remainder)
    * `remainder(x,y)` (C99/C++11, specific rounding for remainder)
* **Absolute Value:** `fabs(x)` (for floating point), `abs(int_val)` (from `<cstdlib>`), `std::abs` (overloaded in `<cmath>` C++17)
* **Other:** `hypot(x,y)` ($\sqrt{x^2+y^2}$, C++11), `erf(x)`, `erfc(x)` (error functions, C++11)

## 13. Utilities (`<utility>`)

### `std::pair<T1, T2>`
*Holds two values (members: `first`, `second`).*
* `std::pair<int, std::string> p1(1, "hello");`
* `auto p2 = std::make_pair(2, "world");`
* `int key = p1.first; std::string val = p1.second;`
* Comparison operators are defined lexicographically.

### `std::tuple<Types...>` (C++11, `<tuple>`)
*Holds a fixed-size collection of heterogeneous values.*
* `std::tuple<int, double, std::string> t1(1, 2.5, "tuple");`
* `auto t2 = std::make_tuple(3, 4.0, "example");`
* `int i = std::get(t1);` (Access by index)
* `double d; std::tie(std::ignore, d, std::ignore) = t2;` (Unpack values, C++11)
* (Structured bindings make tuple access easier in C++17: `auto [a,b,c] = my_tuple;`)

### `std::move` (C++11)
* `std::move(obj)` (Casts `obj` to an rvalue reference, enabling move semantics)