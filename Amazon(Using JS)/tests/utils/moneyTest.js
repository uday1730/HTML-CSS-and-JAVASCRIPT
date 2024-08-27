import { formatCurrencey } from "../../utils/money.js";

describe('test suite : formatCurrencey',()=>{
  it('converts cents to dollers',()=>{
    expect(formatCurrencey(2095)).toEqual('20.95');
  });
  it('work\'s with 0',()=>{
    expect(formatCurrencey(0)).toEqual('0.00');
  });
  it('rounds to nearest uppercent',()=>{
    expect(formatCurrencey(2095.5)).toEqual('20.96');
  });
  it('rounds to nearest lowercent',()=>{
    expect(formatCurrencey(2094.4)).toEqual('20.94');
  })
});