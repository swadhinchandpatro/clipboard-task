const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  beforeEach(() => {
    jest.mock('crypto');
  })

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('with partitionkey string', () => {
    let event = { partitionKey: "1234"}
    let candidate = deterministicPartitionKey(event);
 
    expect(candidate).toBe("1234")
  })

  it('with partitionkey number', () => {
    let event = { partitionKey: 1234}
    let candidate = deterministicPartitionKey(event);

    expect(candidate).toBe("1234")
  })

  it('with partitionkey function', () => {
    let event = { partitionKey: function() {}}
    try {
      let candidate = deterministicPartitionKey(event);
    }catch (err) {
      expect(err.message).toBe("invalid parameter")
    }
    
  })

  it('with partitionkey null', () => {
    let event = { partitionKey: null}
    let candidate = deterministicPartitionKey(event);
    expect(candidate).toBe("58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2")
    
  })

  it('with partitionkey object', () => {
    let event = { partitionKey: { key: 'fdfdff'}}
    let candidate = deterministicPartitionKey(event);
    
    expect(candidate).toBe("{\"key\":\"fdfdff\"}")
  })

  it('with no key and some data', () => {
    let event = { something: "data"}
    let candidate = deterministicPartitionKey(event);
    
    expect(candidate).toBe("719b963f7d53d56e9cd071822509e1875994b836070e1a534a89e7d30193051c5bbf3460e89342f00a42fead30c969fd34bc38eaaf32d9f3852f7436fd82c11d")
  })

  it('with no key and huge data', () => {
    let event = {
      something: "data",
      name: 'swadhin',
      surname: 'patro',
      age: 14,
      school: 'Nit trichy',
      company: 'cipboard health',
      address: '12 - flat, somea address, some street' 
    }
    let candidate = deterministicPartitionKey(event);
    
    expect(candidate).toBe("031f99fa08f76a5ab92f71ef5ea62689819fff61cf69bd3619e013f6e19afb44327c61e74f0c4d0d36bb43911647ad50796bbca8dc2114073a3ff1a04039c8a1")
  })

  it('with partitionKey length more that 256 and some other data', () => {
    let event = {
      partitionKey: '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e258540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e21',
      something: "data",
      name: 'swadhin',
      surname: 'patro',
      age: 14,
      school: 'Nit trichy',
      company: 'cipboard health',
      address: '12 - flat, somea address, some street' 
    }
    let candidate = deterministicPartitionKey(event);
    expect(candidate).toBe('a69ed4088fc2d860dfaf70a7d1cc89dfd6ef0081a3ec1063a855daffa44f383da90870514e3d1b0684060a0051c4dac327d3eb2d5576646b7a13fe0e3a9730b8')
  })

  it('with partitionKey length more that 256 and no data', () => {
    let event = {
      partitionKey: '12345678901234567890123456789012989822302390023908203802380830280238028422402802801234567890123456789012345678901298982230239002390820380238083028023802842240280280',
    }
    let candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(event.partitionKey)
  })
});
