# Qunit Hello World demo

## Introduction
QUnit is a JavaScript test framework, we can search a lot of examples on the
Internet but all is used for Web front-end. This demo mainly focuses on the
NodeJS.

## Install the QUnit
```
$ sudo npm install qunit -g --verbose
```

Make sure you set your **NODE_PATH** environment variable to the
**/usr/local/lib/node_modules**

## Run the QUnit Hell World demo
```
$ git clone https://github.com/qiuzhong/misc-notes.git
$ cd misc-notes/node/qunit/tests
$ node runner.js

Testing  /home/orange/01_qiuzhong/02-git/02-qz/misc-notes/node/qunit/source/myscript.js ...
done

Assertions:
┌────────┬────────────────┬───────────┬────────┐
│ Module │ Test           │ Assertion │ Result │
├────────┼────────────────┼───────────┼────────┤
│ tests  │ that a is true │           │ ok     │
└────────┴────────────────┴───────────┴────────┘

Tests:
┌────────┬────────────────┬────────┬────────┬───────┐
│ Module │ Test           │ Failed │ Passed │ Total │
├────────┼────────────────┼────────┼────────┼───────┤
│ tests  │ that a is true │ 0      │ 1      │ 1     │
└────────┴────────────────┴────────┴────────┴───────┘

Summary:
┌────────────────────────────────────────────────────┬────────┬────────┬───────┬─────────┐
│ File                                               │ Failed │ Passed │ Total │ Runtime │
├────────────────────────────────────────────────────┼────────┼────────┼───────┼─────────┤
│ .../02-qz/misc-notes/node/qunit/source/myscript.js │ 0      │ 1      │ 1     │ 31      │
└────────────────────────────────────────────────────┴────────┴────────┴───────┴─────────┘

Global summary:
┌───────┬───────┬────────────┬────────┬────────┬─────────┐
│ Files │ Tests │ Assertions │ Failed │ Passed │ Runtime │
├───────┼───────┼────────────┼────────┼────────┼─────────┤
│ 1     │ 1     │ 1          │ 0      │ 1      │ 31      │
└───────┴───────┴────────────┴────────┴────────┴─────────┘

```
