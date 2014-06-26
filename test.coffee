class Test
  constructor: () ->
    console.log 'in in der'
  inclass: () ->
    console.log 'ssss'
  @thisclass: () ->
    console.log 'tttt'
a = new Test
a.inclass()
Test.thisclass()
