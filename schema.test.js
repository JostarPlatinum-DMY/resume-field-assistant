import test from 'node:test';import assert from 'node:assert/strict';import {extractFields,normalizeMonth,safeMappings} from './schema.js';
test('parses profile labels and normalizes date ranges',()=>{assert.deepEqual(extractFields('姓名：张三\n邮箱: z@example.com\n开始时间：2024年9月\n结束时间：2026/06'),{name:'张三',email:'z@example.com',startDate:'2024-09',endDate:'2026-06'})});
test('rejects invalid months',()=>{assert.equal(normalizeMonth('2024-13'),'')});
test('accepts only supported, available, distinct field mappings',()=>{assert.deepEqual(safeMappings([{index:0,key:'name'},{index:0,key:'email'},{index:1,key:'unknown'},{index:2,key:'email'},{index:3,key:'phone'}],3,{name:'A',email:'a@b.c'}),[{index:0,key:'name'},{index:2,key:'email'}])});
