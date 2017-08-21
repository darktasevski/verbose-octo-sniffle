
## The Problem ##

Enums have limitations and get misused?

```csharp
public enum Gender
{
    Unknown,
    Male,
    Female
}

...

public static class GenderHelpers
{
	public static char GenderCode(Gender gender)
	{
	    switch (gender)
	    {
	        case Gender.Male:
	            return 'M';
	        case Gender.Female:
	            return 'F';
	        default:
	            return '\0';
	    }
	}
	
	public static string GenderString(Gender gender)
	{
	    switch (gender)
	    {
	        case Gender.Male:
	            return "Male";
	        case Gender.Female:
	            return "Female";
	        default:
	            return "Unknown";
	    }
	}
	
	public static Gender GenderFromString(string gender)
	{
	    if (gender.ToLower().Equals("male"))
	    {
	        return Gender.Male;
	    }
	
	    if (gender.ToLower().Equals("female"))
	    {
	        return Gender.Female;
	    }
	
	    return Gender.Unknown;
	}

	public static Gender GenderFromChar(char gender)
	{
	    if (gender.Equals('M'))
	    {
	        return Gender.Male;
	    }
	
	    if (gender.Equals('F'))
	    {
	        return Gender.Female;
	    }
	
	    return Gender.Unknown;
	}
}

...

var x = GenderHelpers.GenderFromString(Gender.Male);
```

- We know that `Gender` exists, but do we all know that `GenderHelpes` exists? How many places do we have the same code found in `GenderHelpers` in other classes? How do we ensure that we are producing the same results in all other places?

## The Solution : Example #1 ##

Add metadata to the enum that represents the data associated with that value.

```csharp
public enum Gender
{
    [GenderMetadata(CharValue = '\0', StringValue = "Unknown")]
    Unknown,

    [GenderMetadata(CharValue = 'M', StringValue = "Male")]
    Male,

    [GenderMetadata(CharValue = 'F', StringValue = "Female")]
    Female
}

[AttributeUsage(AttributeTargets.Field)]
internal class GenderMetadata : Attribute
{
    public char CharValue { get; set; }
    public string StringValue { get; set; }
}
```

All the data is in one place, it is easy to see what value will be returned when, values are easy to modify. But how do we get to that data?

Why, using extension methods, of course!

First, we're going to extend the `Enum` class to return custom attributes:

```csharp
public static class EnumExtensions
{
    public static TAttribute GetEnumAttribute<TAttribute>(this Enum enumValue) where TAttribute : Attribute
    {
        var memberInfo = enumValue.GetType().GetMember(enumValue.ToString());

        return memberInfo[0]
            .GetCustomAttributes(typeof(TAttribute), false)
            .OfType<TAttribute>()
            .FirstOrDefault();
    }

    public static TAttribute[] GetEnumAttributes<TAttribute>(this Enum enumValue) where TAttribute : Attribute
    {
        var memberInfo = enumValue.GetType().GetMember(enumValue.ToString());

        return memberInfo[0]
            .GetCustomAttributes(typeof(TAttribute), false)
            .OfType<TAttribute>()
			.ToArray();
    }

    public static T FromString<T>(string value) where T : struct, IComparable, IFormattable, IConvertible
    {
        if (!typeof(T).IsEnum) throw new ArgumentException("T must be an enumerated type");

        try
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
        catch
        {
            return (T)Activator.CreateInstance(typeof(T));
        }
    }
}
```

Next, we write simple extension methods for extracting the data we want:

```csharp
public static class Genders
{
    public static char CharValue(this Gender gender)
    {
        return gender.GetEnumAttribute<GenderMetadata>().CharValue;
    }

    public static string StringValue(this Gender gender)
    {
        return gender.GetEnumAttribute<GenderMetadata>().StringValue;
    }

    public static Gender FromString(string gender)
    {
        return EnumExtensions.FromString<Gender>(gender);
    }
}
```

And now we can write very readable code using enums to supply data:

```csharp
foreach (var gstr in new[] { "male", "female", "kangaroo" })
{
    var gender = Genders.FromString(gstr);
    Console.WriteLine($"{gstr} : {gender.CharValue()} : {gender.StringValue()}");
}
```

## The Solution: Example #2 #

```csharp
public enum MartenEnvironmentType
{
	Local = 0,
	QA1,
	QA2,
	QA3,
	QA4,
	Dev05,
	Dev06,
	Dev07,
	Dev08,
	Dev,
	QA,
	Stage,
	Demo,
	Training,
	CarrierReviewStage,
	CarrierReviewProd,
	Prod
}

public static class MartenEnvrionmentTypeExtensions
{
	public static string GetCoreConsumersUri(this MartenEnvironmentType environment)
	{
		var uri = "";
		switch (environment)
		{
			case MartenEnvironmentType.Prod:
				uri = "lq.tcp://servicebus.extendhealth.com:2400/servicebus_core";
				break;
			case MartenEnvironmentType.Stage:
			case MartenEnvironmentType.CarrierReviewProd:
			case MartenEnvironmentType.CarrierReviewStage:
			case MartenEnvironmentType.Demo:
			case MartenEnvironmentType.Training:
				uri = "lq.tcp://stageservicebus.extendhealth.com:2300/servicebus_core_stage";
				break;
			case MartenEnvironmentType.QA:
			case MartenEnvironmentType.QA1:
			case MartenEnvironmentType.QA3:
			case MartenEnvironmentType.QA4:
				uri = "lq.tcp://qaservicebus.extendhealth.com:2200/servicebus_core_qa";
				break;
			case MartenEnvironmentType.QA2:
			case MartenEnvironmentType.Dev05:
			case MartenEnvironmentType.Dev06:
			case MartenEnvironmentType.Dev07:
			case MartenEnvironmentType.Dev08:
			case MartenEnvironmentType.Dev:
			case MartenEnvironmentType.Local:
				uri = "lq.tcp://devweb1:2100/servicebus_core_dev";
				break;
			default:
				throw new ArgumentOutOfRangeException(nameof(environment), environment, null);
		}
		return uri;
	}
	
	public static string GetOltpEnvironment(this MartenEnvironmentType environment)
	{
		var oltpEnvironment = "";
		switch (environment)
		{
			case MartenEnvironmentType.Prod:
				oltpEnvironment = "ExtendHealthProd";
				break;
			case MartenEnvironmentType.Stage:
			case MartenEnvironmentType.CarrierReviewProd:
			case MartenEnvironmentType.CarrierReviewStage:
			case MartenEnvironmentType.Demo:
			case MartenEnvironmentType.Training:
				oltpEnvironment = "ExtendHealthStage";
				break;
			case MartenEnvironmentType.QA:
			case MartenEnvironmentType.QA1:
			case MartenEnvironmentType.QA3:
			case MartenEnvironmentType.QA4:
				oltpEnvironment = "ExtendHealthQA";
				break;
			case MartenEnvironmentType.QA2:
			case MartenEnvironmentType.Dev05:
			case MartenEnvironmentType.Dev06:
			case MartenEnvironmentType.Dev07:
			case MartenEnvironmentType.Dev08:
			case MartenEnvironmentType.Dev:
			case MartenEnvironmentType.Local:
				oltpEnvironment = "ExtendHealthDev";
				break;
			default:
				throw new ArgumentOutOfRangeException(nameof(environment), environment, null);
		}
		return oltpEnvironment;
	}
	
	public static string GetOltpConnectionString(this MartenEnvironmentType environment)
	{
		var oltpEnvironment = environment.GetOltpEnvironment();
		var connectionStringConfig = ConfigurationManager.ConnectionStrings[oltpEnvironment];
		if (connectionStringConfig == null) throw new Exception("No connection string in configuration");
	
		return connectionStringConfig.ConnectionString;
	}
}
```

Becomes:

```csharp
public enum MartenEnvironment
{
    [MartenEnvironmentMetadata(
        ConsumersUri = "lq.tcp://servicebus.extendhealth.com:2400/servicebus_core",
        OltpEnvironment = "ExtendHealthProd")]
    Prod,

    [MartenEnvironmentMetadata(
        ConsumersUri = "lq.tcp://stageservicebus.extendhealth.com:2300/servicebus_core_stage",
        OltpEnvironment = "ExtendHealthStage")]
    Stage,

    [MartenEnvironmentMetadata(
        ConsumersUri = "lq.tcp://qaservicebus.extendhealth.com:2200/servicebus_core_qa",
        OltpEnvironment = "ExtendHealthQA")]
    QA,

    [MartenEnvironmentMetadata(
        ConsumersUri = "lq.tcp://devweb1:2100/servicebus_core_dev",
        OltpEnvironment = "ExtendHealthDev")]
    Dev
}

[AttributeUsage(AttributeTargets.Field)]
internal class MartenEnvironmentMetadata : Attribute
{
    public string ConsumersUri { get; set; }
    public string OltpEnvironment { get; set; }
}

public static class MartenEnvironments
{
    public static string ConsumerUri(this MartenEnvironment env)
    {
        return env.GetEnumAttribute<MartenEnvironmentMetadata>().ConsumersUri;
    }

    public static string OltpEnvironment(this MartenEnvironment env)
    {
        return env.GetEnumAttribute<MartenEnvironmentMetadata>().OltpEnvironment;
    }

    public static MartenEnvironment FromString(string env)
    {
        return EnumExtensions.FromString<MartenEnvironment>(env);
    }
}

public enum MartenEnvironmentAlias
{
    [AliasFor(MartenEnvironment.Dev)]
    Local = 0,

    [AliasFor(MartenEnvironment.QA)]
    QA1,

    [AliasFor(MartenEnvironment.Dev)]
    QA2,

    [AliasFor(MartenEnvironment.QA)]
    QA3,

    [AliasFor(MartenEnvironment.QA)]
    QA4,

    [AliasFor(MartenEnvironment.Dev)]
    Dev05,

    [AliasFor(MartenEnvironment.Dev)]
    Dev06,

    [AliasFor(MartenEnvironment.Dev)]
    Dev07,

    [AliasFor(MartenEnvironment.Dev)]
    Dev08,

    [AliasFor(MartenEnvironment.Dev)]
    Dev,

    [AliasFor(MartenEnvironment.QA)]
    QA,

    [AliasFor(MartenEnvironment.Stage)]
    Stage,

    [AliasFor(MartenEnvironment.Stage)]
    Demo,

    [AliasFor(MartenEnvironment.Stage)]
    Training,

    [AliasFor(MartenEnvironment.Stage)]
    CarrierReviewStage,

    [AliasFor(MartenEnvironment.Stage)]
    CarrierReviewProd,

    [AliasFor(MartenEnvironment.Prod)]
    Prod
}

[AttributeUsage(AttributeTargets.Field)]
internal class AliasFor : Attribute
{
    public AliasFor(MartenEnvironment env)
    {
        Environment = env;
    }

    public MartenEnvironment Environment { get; set; }
}

public static class MartenEnvrionmentTypes
{
    public static string ConsumersUri(this MartenEnvironmentAlias env)
    {
        return env.GetEnumAttribute<AliasFor>().Environment.ConsumerUri();
    }

    public static string OltpEnvironment(this MartenEnvironmentAlias env)
    {
        return env.GetEnumAttribute<AliasFor>().Environment.OltpEnvironment();
    }

    public static string GetOltpConnectionString(this MartenEnvironmentAlias env)
    {
        var config = ConfigurationManager.ConnectionStrings[env.OltpEnvironment()];
        if (config == null) throw new Exception("No connection string in configuration");
        return config.ConnectionString;
    }
}
```

Slightly fewer lines (when line breaks for readability are normalized), but simpler to use and update.

## The Solution: Example #3 ##

default values and non-string properties


## Optimizations ##

caching, because lookups take too long

### Active Caching ###

```csharp
public static class Genders
{
    private static readonly ConcurrentDictionary<Gender, GenderMetadata> MetadataCache;
    private static readonly ConcurrentDictionary<string, Gender> StrTypeCache;
    private static readonly ConcurrentDictionary<char, Gender> CharTypeCache;

    static Genders()
    {
        MetadataCache = new ConcurrentDictionary<Gender, GenderMetadata>();
        StrTypeCache = new ConcurrentDictionary<string, Gender>();
        CharTypeCache = new ConcurrentDictionary<char, Gender>();

        foreach (var gender in Enum.GetValues(typeof(Gender)).Cast<Gender>())
        {
            MetadataCache[gender] = gender.GetEnumAttribute<GenderMetadata>();
            StrTypeCache[gender.StringValue()] = gender;
            CharTypeCache[gender.CharValue()] = gender;
        }
    }

    public static char CharValue(this Gender gender)
    {
        return MetadataCache[gender].CharValue;
    }

    public static string StringValue(this Gender gender)
    {
        return MetadataCache[gender].StringValue;
    }

    public static Gender FromString(string gender)
    {
        return StrTypeCache[gender];
    }

    public static Gender FromChar(char gender)
    {
        return CharTypeCache[gender];
    }
}
```

### Lazy Caching ###

```csharp
public static class Genders
{
    private static readonly ConcurrentDictionary<Gender, GenderMetadata> MetadataCache;
    private static readonly ConcurrentDictionary<string, Gender> StrTypeCache;
    private static readonly ConcurrentDictionary<char, Gender> CharTypeCache;

    static Genders()
    {
        MetadataCache = new ConcurrentDictionary<Gender, GenderMetadata>();
        StrTypeCache = new ConcurrentDictionary<string, Gender>();
        CharTypeCache = new ConcurrentDictionary<char, Gender>();
    }

    public static char CharValue(this Gender gender)
    {
        if (!MetadataCache.ContainsKey(gender))
        {
            MetadataCache[gender] = gender.GetEnumAttribute<GenderMetadata>();
        }

        return MetadataCache[gender].CharValue;
    }

    public static string StringValue(this Gender gender)
    {
        if (!MetadataCache.ContainsKey(gender))
        {
            MetadataCache[gender] = gender.GetEnumAttribute<GenderMetadata>();
        }

        return MetadataCache[gender].StringValue;
    }

    public static Gender FromString(string gender)
    {
        if (!StrTypeCache.ContainsKey(gender))
        {
            StrTypeCache[gender] = EnumExtensions.FromString<Gender>(gender);
        }

        return StrTypeCache[gender];
    }

    public static Gender FromChar(char gender)
    {
        if (CharTypeCache.ContainsKey(gender)) return CharTypeCache[gender];

        // Because of this, probably still want to actively load
        foreach (var g in Enum.GetValues(typeof(Gender)).Cast<Gender>())
        {
            if (!g.CharValue().Equals(gender)) continue;
            CharTypeCache[gender] = g;
            break;
        }

        return CharTypeCache[gender];
    }
}
```

## Advanced Features ##

Metadata values can be changed at runtime.

```csharp
public static void SetStringValue(this Gender gender, string val)
{
    MetadataCache[gender].StringValue = val;
}

public static void SetCharValue(this Gender gender, char val)
{
    MetadataCache[gender].CharValue = val;
}
```

## Real World Examples ##

Move the MartenEnvironment stuff here, and add the ScenarioType stuff