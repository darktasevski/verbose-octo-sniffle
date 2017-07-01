C# 7 First Look: Key Features
=============================

### Compiler Pipeline ##

| **Stage**      | Description |
|----------------|-------------|
| **Parser**     | Parse source into language grammar. |
| **Symbols**    | Form named symbols. |
| **Binder**     | Identifiers matched to symbols. |
| **IL Emitter** | Emit intermediate language to assembly. |

### Static Using ###

```csharp
using static System.Console;
using static System.Math;

class Program
{
	static void Main ()
	{
		WriteLine (Sqrt(3 * 3 + 4 * 4));
	}
}
```

The `using static` statement allows us to omit the `Console` prefix on `WriteLine` and the `Math` prefix on `Sqrt`.

## Using `out` Variables ##

- Out parameters are not fluid
- Out parameters must be declared first
- Can't use var to declare out parameters
- Out _**variables**_ solve all these problems

```csharp
public void OldWay ()
{
	int hour;
	int minutes;
	int seconds;
	GetTime(out hour, out minutes, out seconds);
	WriteLine($"{hour}:{minutes}:{seconds}");
}

public void NewWay ()
{
	GetTime(out int hour, out int minutes, out int seconds);
	WriteLine($"{hour}:{minutes}:{seconds}");
}

public void GetTime (out int hour, out int minutes, out in seconds)
{
	hour = 1;
	minutes = 30;
	seconds = 20;
}
```

Note that when using out variables, we don't have to declare them before using them, and they are still scoped to the method we are using them in.

## Pattern Matching ##

_New keywords: `is` and `when`_

_Patterns_ are a syntactic element that can test that a value has a certain "shape".

Patterns enhance two existing constructs. **Is expressions** can have a pattern on the right-hand side, not just types, and **case clauses** in switch statements can now match on patterns, not just constants. In fact, case clauses can now have conditions.

There are three kinds of patterns:

- Constant Patterns
- Type Patterns
- Var Patterns

```csharp
public void PrintSum (object o)
{
	if (o is null) return; // constant pattern
	if (!(o is int i)) return; // type pattern (int)

	// i is now the integer value of the object

	var sum = 0;

	for (var j = 0; j <= i; j++)
	{
		sum += j;
	}

	WriteLine($"The sum of 1 to {i} is {sum}");
}
```

The example could also be written like this:

```csharp
public void PrintSum(object o)
{
	if (o is int i || o is string s && int.TryParse(s, out i))
	{
		var sum = 0;
	
		for (var j = 0; j <= i; j++)
		{
			sum += j;
		}
	
		WriteLine($"The sum of 1 to {i} is {sum}");
	}
}
```

Case statements can now test the shape of an object using the `when` keyword.

```csharp
switch (employee)
{
	case VicePresident vp when (vp.StockShares < 5000):
		...
		break;
	case VicePresident vp when (vp.StockShares >= 5000):
		...
		break;
	case Manager m:
		...
		break;
	case Employee e:
		...
		break;
}
```


## Tuples ##

_Get more than one value returned from a method._

This used to be done with `out` parameters, but (as described earlier) they are clunky and (more importantly) they cannot be used with async methods. Alternatively, we could use `System.Tuple<T>`, but it tends to be very verbose and requires the allocation of a tuple object. And finally, we could use an anonymous type returned through a dynamic return type, but that has a high performance overhead, and we lose static type checking.

Tuples can return more than just two elements, and each one can be accessed with do notation. The are automatically named `Item1`, `Item2`, and so forth. You can even name the return parts using deconstruction techniques like `(var firstName, var middleInitial, var lastName) someMethod();`

- Tuples convert to other tuples
- Tuples are value types
- Tuple elements are public, mutable fields
- Tuples can be used as keys in a `Dictionary`

> To use Tuples, you may need to first install `System.ValueTuple` into your project via Nuget.

```csharp
public (int, int, int) void GetTime ()
{
	return (1, 30, 40); // this is a tuple literal
}

public void Main ()
{
	var time = GetTime();
	WriteLine($"Time: {time.Item1}:{time.Item2}:{time.Item3}");
}
```

Instead of using the `ItemN` naming convention, you can provide names to the values returned in the tuple.

```csharp
public (int hour, int minutes, int seconds) void GetTime ()
{
	return (1, 30, 40);
}

public void Main ()
{
	var time = GetTime();
	WriteLine($"Time: {time.hour}:{time.minutes}:{time.seconds}");
}
```

Or you can use deconstruction to name the values in the tuple.

```csharp
public (int, int, int) void GetTime ()
{
	return (1, 30, 40); // this is a tuple literal
}

public void Main ()
{
	(var hour, var minutes, var seconds) = GetTime();
	// var(hour, minutes, seconds) = GetTime(); // This works, too
	WriteLine($"Time: {hour}:{minutes}:{seconds}");
}
```

> You can also deconstruct into existing variables, or a mix of existing and new variables. In these cases, you will not want to `var` keyword outside of the parentheses.

## Local Functions ##

_A function declared within another function_

**PRO:** Allows helper function to be declared inside the function that they help.
**CON:** Unable to write unit tests directly against the helper functions.

```csharp
public int Fibonacci(int x)
{
	if (x < 0) throw new ArgumentException("Must be at least 0", nameof(x));

	return Fib(x).current;

	(int current, int previous) Fib(int i)
	{
		if (i == 0) return (1,0);
		var (current, previous) = Fib(i - 1);
		return (current + previous, current);
	}
}
```

> Parameters and local variables from the enclosing scope are visible within the local function.

### Literals ###

Literals allow you to use underscores as separators.

```csharp
var x = 1_234_567; // x = 1234567
``` 

### Return by Reference ###

Notice all the places the `ref` keyword must be used to ensure we are getting a reference, not a value.

```csharp
public ref int Substitute(int value, int[] numbers)
{
	for (int i < 0; i < numbers.Length; i++)
	{
		if (numbers[i] == value) return ref numbers[i];
	}

	throw new IndexOutOfRangeException("NotFound");
}

public void Main()
{
	int[] numbers = { 2, 7, 1, 9, 12, 8, 15 };
	ref int position = ref Substitute(12, numbers);

	// position is now a reference to the position in the array

	position = -12;
	WriteLine(numbers[4]); // should print -12
}
```

### Throw Exceptions in Expressions ###

```csharp
public class Employee
{
	public string Position { get; }
	public Employee(string position) => Position = position ?? throw new ArgumentNullException();
}
```