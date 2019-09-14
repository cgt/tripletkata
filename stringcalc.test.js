describe('String calculator', () => {
  it('given empty string, returns "0"', () => {
    expect(add("")).toBe("0")
  })
  it('given "1", return "1"', () => {
    expect(add("1")).toBe("1")
  })
  it('given "2", return "2"', () => {
    expect(add("2")).toBe("2")
  })
  it('given "1,1", return "2"', () => {
    expect(add("1,1")).toBe("2")
  })
  it('given "1,2", return "3"', () => {
    expect(add("1,2")).toBe("3")
  })
  it('given "1,2,3", return "6"', () => {
    expect(add("1,2,3")).toBe("6")
  })
  it('given "1.1,2,2, return "3.3"', () => {
    expect(add("1.1,2.2")).toBe("3.3")
  })
  it('given "1\\n1", return "2"', () => {
    expect(add("1\n1")).toBe("2")
  })
  it('given "1\\n2,3", return "6"', () => {
    expect(add("1\n2,3")).toBe("6")
  })
  it('given "175.2,\\n35", return error message', () => {
    expect(add("175.2,\n35")).toBe("Number expected but '\\n' found at position 6.")
  })
  it('given "1175.2,\\n35", return error message', () => {
    expect(add("1175.2,\n35")).toBe("Number expected but '\\n' found at position 7.")
  })
  it('given "1175.2\\n,35", return error message', () => {
    expect(add("1175.2\n,35")).toBe("Number expected but ',' found at position 7.")
  })
  it('given input has trailing comma, return error message', () => {
    expect(add("1,3,")).toBe("Number expected but EOF found")
  })
  it('given input has trailing newline, return error message', () => {
    expect(add("1,3\n")).toBe("Number expected but EOF found")
  })
  it('given input has a custom separator ";", return correct calculation', () => {
    expect(add("//;\n1;2")).toBe("3")
  })
  it('given input has a custom separator "|", return correct calculation', () => {
    expect(add("//|\n1|2")).toBe("3")
  })
  it('given input has a custom separator "sep", return correct calculation', () => {
    expect(add("//sep\n1sep2")).toBe("3")
  })
  it('given input has newline as custom delimiter, return NaN', () => {
    expect(add("//\n\n1sep2")).toBe("NaN")
  })
  it('given input has a custom separator "|" but uses a regular separator, return error message', () => {
    expect(add("//|\n1|2,3")).toBe("ERROR")
  })
})

describe('split', () => {
  it('foo', () => {
    const result = "175.2,\n35".split(/[,\n]/).filter(s => s !== "")
    expect(result).toEqual(["175.2", "35"])
  })
  it('bar', () => {
    const result = "1,2,".split(/[,\n]/)
    expect(result).toEqual(["1", "2", ""])
  })
  it('string slice', () => {
    expect("abcdef".slice(3)).toEqual("def")
  })
  it('check for empty string element', () => {
    expect(["foo", "bar", ""].some(element => element === "")).toBe(true)
  })

})

function add(input) {
  if (input === "") {
    return "0"
  }

  let delimiter = /[,\n]/
  if (input.startsWith("//")) {
    const z = input.split("\n")
    delimiter = z[0].slice(2)
    input = input.slice(2+delimiter.length)
    if (input.includes(',')) {
      return "ERROR"
    }
  }
  const x = input.split(delimiter)

  if (x[x.length-1] === ""){
    return "Number expected but EOF found"
  }

  let loc = input.indexOf(",\n")
  if (loc !== -1) {
    return errorMessage('\\n', loc)
  }
  loc = input.indexOf("\n,")
  if (loc !== -1) {
    return errorMessage(',', loc)
  }

  const y = x
    .map(s => parseFloat(s))
    .reduce((total, current) => total + current)
  if (input.includes(".")) {
    return y.toFixed(1)
  } else {
    return y.toString()
  }
}

function errorMessage(unexpected, loc) {
  return `Number expected but '${unexpected}' found at position ${loc + 1}.`;
}
