PowerShell Resembles Perl
=========================

## Basics ##

The comments character in PowerShell scripts is `#`.

### Interactive Shell ###

#### Execution Policy ####
_Requires elevated permissions_

```
PS> Set-ExecutionPolicy RemoteSigned
```

#### Run Script ####

Run a script by fully-qualified path or relative path, but not in the current directory. The first two commands will work, but the third will not. (Assuming you are in the `C:\scripts` directory for the second and third commands.)

```
PS> C:\scripts\myscript.ps1
PS> .\myscript.ps1
PS> myscript.ps1
```

#### Read and Write from Interactive Shell ####

```
$value = Read-Host
Write-Host -ForegroundColor White $value -BackgroundColor Black
```

#### Add a Reference to Another Script ####

```
Import-Module "myscript.ps1"
```

#### Using .NET Classes ####

To use a .NET class in PowerShell, you just need to identify the namespace between brackets and then use a double colon to call the method you want. Parameters are passed the same way as in .NET.

```
[DateTime]::Now
```

### Pipeline ###

```
PS> [DateTime]::Now | Write-Host -ForegroundColor White -BackgroundColor Black
```

You can break it across multiple lines using the backtick:

```
Get-Process | where{$_.Name -like "PowerShell"} | Select Id
```

becomes

```
Get-Process | `
	where{$_.Name -like "powershell"} | `
		Select Id
```

### Variables ###

- Prefaced with the `$`
- Not released until the end of the session
- Cast between types using bracekets

```
# Preface with the sigil
$var1 = "something"

# Release the contents
$var1 = $null

# Casting
[System.DateTime]$var3 = "2017-05-16"
```

#### Get Properties From An Item ####

```
Get-Process | `
	where{$_.Name -like "powershell"} | `
		Format-List
```

Store it in a variable:

```
$var1 = Get-Process | `
	where{$_.Name -like "powershell"} | `
		Format-List
```

Store the command itself by enclosing them in curve brackets “{}”.

```
$var1 = {Get-Process | `
	where{$_.Name -like "powershell"} | `
		Format-List}
```

There are three commands to format variable output:

| | |
|-|-|
| `Format-List`  | formats as a vertical list |
| `Format-Table` | formats as a table |
| `Format-Wide`  | formats as a single-data item, defaults to 2 columns<br>use the `-Column n` to have different columns |

#### Type Comparison ####

```
$myVar = "PowerShell"
($myVar -is [System.String])
```

### String Literals and Expansion ###

```
$a="SyncFusion"

#Literal strings
$literal = '$a`n and PowerShell'

#Expanding strings
$expanding = "$a`n and PowerShell"
```

#### Here Strings ####

Here strings are a concepts borrowed from Perl.

```
#simple string
$simpleString="Example String"

#Empty here string
@"

"@

#PowerShell here string
$largeString= @"
	Hello, this
	is a PowerShell here string. You can define
	multiple string lines into one single text block.
	You can even use special characters like `n or expand it with another
	string
	$simpleString
"@
```

#### Regular Expressions ####

Matching

```
#Text to evaluate.
$text = @"
This is a PowerShell string!
We will use it to test regular expressions
"@

#Evaluate a pattern. Returns:True
$text -match "\w"

#Evaluate a pattern. Returns:False
$text -match "!\w+"
```

Replacing

```
#Text to evaluate.
$text = @"
This is a PowerShell string!
We will use it to test regular expressions
"@

#Replace every character with the A character.
$text -replace "\w","A"

#Replace every string followed by !, with the B character.
$text -replace "\w+!","B"
```

### Using Lists ###

#### Arrays ####

```
#Explicitly
$array1 = @(1,2,3,4,5,6,7,8,9,10)

#Implicitly
$array2 = 1,2,3,4,5,6,7,8,9,10

#Accessing with a literal index
$array1[2]
#Accessing with a variable index

$index=4
$array2[$index]
```

#### .NET Lists ####

Since you can use .NET classes and objects, you are able to use any kind of list from `Collections.Generic` collections. An example of using a list of strings is shown in the code block below.

```
$myList = New-Object Collections.Generic.List[string]
$myList.Add("Rui")
$myList.Item(0)
```

#### Hash Table ####

Hash Tables in PowerShell are declared using the `@` character and enclosing the Key/Value pairs in curly braces separated by semicolons.

```
# The @{ cannot have any spacing between it!
$hash= @{
	"KEY1" = "VAL1";
	"KEY2" = "VAL2";
	"KEY3" = “VAL3"
}
```

Easily access the values a hash table:

```
$hash["KEY1"]
```

Iterate over keys:

```
$hash.Keys | % { "key = $_ , value = " + $hash.Item($_) }
```

### Flow Control ###

#### Comparison Operators ####

| Operator       | Purpose |
|----------------|---------|
| `-eq`          | Equals  |
| `-ne`          | Not equals |
| `-ge`          | Greater than or equal to |
| `-gt`          | Greater than |
| `-lt`          | Less than or equal to |
| `-le`          | Less than |
| `-like`        | Like (patterns) supports wildcards `?*[a-b][ab]` |
| `-notlike`     | Inverse of `-like` |
| `-match`       | RegEx match evaluation |
| `-notmatch`    | Inverse of `-match` |
| `-contains`    | List contains a value |
| `-notcontains` | Inverse of `-contains` |
| `-is`          | Type comparison |
| `-isnot`       | Inverse of `-is` |

#### Logic Operators ####

| Operator | Purpose |
|----------|---------|
| `-and`   | Returns true if all conditional statements are true |
| `-or`    | Returns false if all conditional statements are false |
| `-xor`   | Returns false if either conditional statement is true, but not if both are |
| `-not`   | Inverts the logical evaluation in a conditional statement |

```
#AND Return False
($a -ne $b) -and (1 -eq 1) -and ($a -eq "PowerShell")

#OR Return True
($a -ne $b) -or (1 -eq 1) -or ($a -eq "PowerShell")

#XOR Returns True
($a -eq $b) -xor ($a -like "H*")

#NOT Returns False
-not ($a -ne $b)

#Combining multiple operators - Returns False
(($a -eq $b) -xor ($a -like "H*") -and (1,2,3,4 -contains 1)) -xor ("A" -ne "B")
```

#### Conditionals ####

Typical `if-else`

```
$myVar=1
if($myVar –lt 2){
	"small"
}else{
 "large"
}
```

Ternary

```
#@{$true=TRUE VALUE;$false=FALSE VALUE}[CONDITION]

$var1=2
$var2=2

$value = @{$true=12345;$false=67890}[$var1 –eq $var2]
#The result should be 12345
```

#### Switch ####

Switching on integers:

```
$int = 15
switch($int)
{
	0 {"You need to sum 15"; break}
	1 {"You need to sum 14"; break}
	2 {"You need to sum 13"; break}
	3 {"You need to sum 12"; break}
	4 {"You need to sum 11"; break}
	5 {"You need to sum 10"; break}
	6 {"You need to sum 9"; break}
	7 {"You need to sum 8"; break}
	15 {"GOOD!!"; break}
	default {"You are close"; break}
}
```

Switching on strings:

```
$str = "abc123"
switch($int)
{
	"123abc" { "correct"; break}
	"123xyz" { "incorrect"; break}
	default {"You are way off"; break}
}
```

Switching with wildcards:

```
$str = "d14151"
switch -wildcard ($str)
{ 
    "a*" {"The color is red."} 
    "b*" {"The color is blue."} 
    "c*" {"The color is green."} 
    "d*" {"The color is yellow."} 
    "e*" {"The color is orange."} 
    "f*" {"The color is purple."} 
    "g*" {"The color is pink."}
    "h*" {"The color is brown."} 
    default {"The color could not be determined."}
}
```

Switching with regular expressions:

```powershell
$a = "r14151"

switch -regex ($a) 
{ 
    "[a-d]" {"The color is red."} 
    "[e-g]" {"The color is blue."} 
    "[h-k]" {"The color is green."} 
    "[l-o]" {"The color is yellow."} 
    "[p-s]" {"The color is orange."} 
    "[t-v]" {"The color is purple."} 
    "[w-y]" {"The color is pink."}
    "[z]" {"The color is brown."} 
    default {"The color could not be determined."}
}
```

#### Loops ####

Given: `$array = 1,2,3,4,5,6`

Example: `while` 

```
$var=0

while($var -lt 6){
	write $array[$var]
	$var++
}
```

Example: `for`

```
for($i=0;$i -lt $array.Count;$i++){
	write $array[$i]
}
```

Example: `foreach`

```
foreach($var in $array){
	write $var
}
```

Example: piping and `%`
```
$array | %{ write $_ }
```

#### Pausing ####

Sleep

```
Start-Sleep -Seconds 5
```

Wait for input

```
Read-Host
```

### Extensibility and Code Reuse ###

#### Create Classes ####

_[Available in PowerShell 5.0](https://xainey.github.io/2016/powershell-classes-and-concepts/)_

Classes can be created using the `Class` keyword. Properties should be explicitly typed, or it will be `System.Object`, which is useless.

```
Class Car
{
	
	[String]$vin
	
	static [int]$numberOfWheels = 4
	
	[int]$numberOfDoors
	
	[datetime]$year
	
	[String]$model

}

$chevy = New-Object Car
```

#### Create Instances of Objects ####

```
$eventLog = New-Object System.Diagnostics.EventLog -ArgumentList "Application"

#Object is available.
$eventLog.Entries | Out-GridView
```

#### Functions and Parameters ####

Simple Function 

```
function GetAllProcess{
	Get-Process
}

#Calling GetAllProcess
GetAllProcess
```

Function With Parameters

```
function MyFunctionA($param1,$param2){
	Write "This is param 1 : $param1"
	write "This is param 2 : $param2"
}

function MyFunctionB{
	param(
		$param1
		,$param2
	)

	process{
		Write "This is param 1 : $param1"
		write "This is param 2 : $param2"
	}
}

#Calling MyFunction[A|B]
MyFunctionA -param1 65 -param2 3
MyFunctionB(65,3) # This will not do what you think
```

##### Script Parameters #####

Parameters can be used not only in functions but in scripts as well. PowerShell allows you to use script parameters, making the entire script reusable just by calling it as a function, which is very useful when you want to create a data flow based on scripts instead of functions. To add parameters to your scripts, you need to use the block param at the beginning of your script, which will only work if it is the first line of code in your script.

```
Param(
	$param1,
	$param2
)

#Start your script definition.
```

##### Parameter Attributes #####

Parameters can have attributes.

| Attribute                                 | Definition |
|-------------------------------------------|------------|
| Mandatory (Boolean)                       | Specifies if the parameter is mandatory; True for yes, False for no. |
| ParameterSetName (String)                 | Specifies the parameter set that the command parameter belongs to. |
| Position (Integer)                        | Specifies the position in which the parameter is in that command signature. |
| ValueFromPipeline (Boolean)               | Specifies if the parameter comes from a pipeline object. Default value is False. |
| ValueFromPipelineByPropertyName (Boolean) | Specifies if the parameter cames from a property of a pipeline object. Default value is False. |
| ValueFromRemainingArguments (Boolean)     | Specifies that the parameter accepts any value from remaining command parameters. |
| HelpMessage                               | Set a description for the parameter. |
| HelpMessageBaseName                       | Specifies an external reference for the Help message description. |
| HelpMessageResourceId                     | Specifies the resource identifier for a Help message. |

```
function TestParameters{
	param(
		#You need to write the attributes inside Parameter()

		# Mandatory parameter
		[Parameter(Mandatory=$true)] $name,

		# Mandatory parameter with Help Message
		[Parameter(Mandatory=$true,HelpMessage="You must enter an Age!")]
		$age,

		# Parameter from a pipeline object.
		[Parameter(ValueFromPipeline =$true)] $address
	)
}
```

##### Parameter Attribute Validation #####

Add validators to evaluate if a parameter matches a validation rule.

| Validator       | Syntax                           | Definition |
|-----------------|----------------------------------|------------|
| ValidateCount   | [ValidateCount($min,$max)]       | Validates the minimum and maximum parameters allowed for a command. |
| ValidateLength  | [ValidateLength($min,$max)]      | Validates the minimum and maximum number of characters for a parameter. |
| ValidatePattern | [ValidatePattern($regexString)]  | Validates a string parameter with a regular expression. |
| ValidateSet     | [ValidateSet($arrayValidValues)] | Validates a parameter according to a set of possible values. |
| ValidateRange   | [ValidateRange($min, $max)]      | Validates a parameter according to a range of possible values. |

```
function ChangeUserType{
	param(
		$userID,

		[ValidateSet("Admin","User","SuperAdmin")]
		$type
	)

	ChangeType -User $userID -Type $type
}

# This will work
ChangeUserType -userID 1 -type "User"

# This will fail
ChangeUserType -userID 1 -type "Regular"
```

### Create a Windows Form ###

_SKIPPED_

## File System ##

### Current Location ###

You can get the current location using the `Get-Location` command. This returns an object that represents the current directory.

```
# Returns the full path for the current location
Get-Location | %{$_.Path}

# Returns drive info
Get-Location | %{$_.Drive}
```

### Get Files From Directory ###

To retrieve information about all files in a directory, you can use the `Get-ChildItem` command, or if you just want to list information about a single item, use the `Get-Item` command. This command has several important parameters

| Parameter | Definition                                                                         |
|-----------|------------------------------------------------------------------------------------|
| -Name     | Gets only the names of the items in the locations.                                 |
| -Recurse  | Gets the items in the specified locations and in all child items of the locations. |
| -Path     | Specifies a path to one or more locations.                                         |

```
# Simple Get-ChildItem
Get-ChildItem -Path (Get-Location).Path

# Get-ChildItem using -Recurse parameter
Get-ChildItem -Path (Get-Location).Path -Recurse
 
# Get-ChildItem using -Recurse parameter and a filter for file name (-Name)
Get-ChildItem -Path (Get-Location).Path -Recurse -Name "*Rui*"

# Get-ChildItem filter by extension
Get-ChildItem -Path (Get-Location).Path | ?{$_.Extension -like "*.txt"}
```

### Get File Contents ###

Use the `Get-Content` command to get the contents of a file.

```
Get-Content -Path "c:\temp\File.txt"

# Get the first three lines of your file using the -TotalCount parameter
Get-Contents -Path "C:\temp\File.txt" -TotalCount 3

# Get the last line of your file using the -Tail parameter
Get-Content -Path "c:\temp\File.txt" -Tail 1

<#
	In this example combining this command with Get-ChildItem
	will allow you to retrieve the content of all files in c:\temp
	directory
#>
# Get the files
Get-ChildItem -Path "c:\temp" -Filter "*.txt" | %{
	#Get Content
	Get-Content -Path $_.FullName
}
```

### Manipulate File Contents ###

Update contents of a file using the `Set-Content` command.

```
Set-Content -Path $path -Value $value
```

You can manipulate the contents of a file in-memory using the `Get-Contents` command, and then write it out using the `Set-Content` command.

```
# File path
$path = "c:\temp\file.txt"

# Get the file contents
Get-Content -Path $path | %{
	# Replace the token in memory
	$new = $_.Replace("_TOKEN_", "PowerShell")
}

# Set the file contents
Set-Content -Path $path -Value $new
```

### Create Temporary Files ###

Temporary files are useful for manipulating files across several invocation.

```
$url = [System.IO.Path]::GetTempFileName()

"Test" | Out-File $url

GetContent $url
```

### Manage Directories ###

#### Create New Directory ####

#### Change Directory Permissions ####

#### Remove Directory ####

#### Rename ####

#### Move File or Directory ####

### Manage Paths ###

#### Join Parts Into Single Path ####

#### Split Path Into Multiple Parts ####

#### Test If Path Exists ####

#### Resolve Path ####

## Processes ##

_SKIPPED_

## Windows Management Instrumentation ##

_SKIPPED_

## Structured Files ##

### Manipulating XML Files ###

#### Import XML From File ####



#### Load XML File From String ####



#### Export XML To File ####



### Manipulating CSV Files ###

#### Import CSV From File ####

_SKIPPED_

#### Export CSV To File ####

_SKIPPED_

#### Load CSV and Send Email ####

_SKIPPED_

### Manipulating TXT Files ###

#### Import TXT From File ####

_SKIPPED_

#### Export TXT To File ####

_SKIPPED_

### Using XSL To Transform XML ###

_SKIPPED_

## SQL Server ##

_SKIPPED_

## Microsoft Office Interop ##

_SKIPPED_
