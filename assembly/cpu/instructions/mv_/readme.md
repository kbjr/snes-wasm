
## mvn

**Block Move Next**

Moves (copies) a block of memory to a new location.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax             | Addressing       | Bytes | Cycles      |
|--------|--------------------|------------------|-------|-------------|
| `0x54` | `mvn srcbk,destbk` | Block Move       | 3     | 7 * (C + 1) |


## mvp

**Block Move Previous**

Moves (copies) a block of memory to a new location.

#### Affected Flags

```
---------
```

#### Modes

| OpCode | Syntax             | Addressing       | Bytes | Cycles      |
|--------|--------------------|------------------|-------|-------------|
| `0x44` | `mvp srcbk,destbk` | Block Move       | 3     | 7 * (C + 1) |
