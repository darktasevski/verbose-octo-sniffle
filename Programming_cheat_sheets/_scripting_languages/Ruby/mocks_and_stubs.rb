# Stubs and Mocks

# a Stub is used to replace a method with a static return

# a Mock is a Stub that will error out, if its method is not called.


# stub example:
car.stub(:break_down)  # it will blank out the existing .break_down method, and return nil.
a_method_that_calls_car_break_down_internally # it will not execute the car.break_down


# mock example:
car.should_receive(:break_down) # this is waitting to be called by something
a_method_that_calls_car_break_down_internally # this SHOULD call car.break_down internally, else, an error will occur






# more mocks:
car.should_receive(:break_down).with(some_parameters)
car.should_receive(:break_down).with(some_parameters).and_return(a_value)


# more Stubs
car.stub(:break_down).with(some_parameters)
car.stub(:break_down).with(some_parameters).and_return(a_value)



# creating fake objects:
x = stub(foo: 1, bar: 2)  # x.foo == 1,   x.bar == 2



# the same thing
car.stub(:break_down).and_return("oh no")
car.stub(break_down: "oh no")
a_method_that_calls_car_break_down_internally


#===================================================================================================================

# rspec stub (replace a method with code that returns a specific result )
zombie.weapon.stub(:slice)
    .with("parameter")
    .and_return("value")  # the slice method will not be executed!!!
method_that_calls_the_slice_method_above
assertion_method

# rspec mock (mock is a stub with an expectation that the method gets called!)

zombie.weapon.should_receive(:slice)
    .with("parameter")
    .and_return("value")
method_that_calls_the_slice_method_above
assertion_method

# rspec doubles 'like a fake object'
foo = stub(name: "brian", age: 27)




# sublime:


Cmd + Shift + p  + "Package Control: Install Package"
