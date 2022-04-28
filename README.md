# Summary по предлагаемой модели базы данных для Violet

## Модель базы данных

### Описание сущностей
```
Entity workSpace:
    [PK] id: string
    [One to many] tables: Table[]
    name: string
    
Entity Table:
    [PK] public id: string
    [Many to one] workSpace: WorkSpace
    [One to many] rows: Row[]
    [One to many] columns: Column[]
    name: string
    
Entity Row:
    [PK] id: string
    [Many to one] table: Table
    idx: number

Entity Column:
    [PK] id: string
    [Many to one] table: Table
    [Many to one] columnType: ColumnType
    idx: number
    name: string;

Entity ColumnType:
    [PK] id: string
    [One to many] columns: Column[]
    name: string /// Произвольное название типа, например `string` для строки или `number` для числа

Entity Field:
    [PK] id: string
    [Many to one] table: Table
    [Many to one] public row: Row
    [Many to one] column: Column
    value: string
```

### Преимущества и недостатки
+ (+) Плоская структура позволяет поддержать создание пользовательских таблиц без необходимости создания аналогичной SQL-таблицы, то есть это решение проще как в разработке так и в поддержке.
+ (-) Сложная поддержка типов пользовательских колонок (в демонстрационном приложении эта проблема пока не решена, надо думать как исправить).
+ (-) Сложные запросы поиска / фильтрации могут выполняться существенно долго при такой структуре б/д.
+ (+) Поддержка быстрой перестановки двух строк или столбцов (например, когда пользователь делает drag на фронте). В случае с неплоской структурой, пришлось бы писать нетривиальный запрос с ALTER TABLE. В нашем случае есть возможность просто пропатчить два entity.

## Заполнение базы данными:
При помощи специального [мини-приложения на `Nest.js`](https://github.com/Costello1329/violet-db-model-test), база данных была заполнена тремя `WorkSpace`'ами, в каждом из которых находилось по три таблицы состоящих из ста колонок и `x` строк (для тестирования `x` принимался за `200`, `1000`, и `5000`). Размеры базы данных и бенчмарки можно найти в таблице снизу.

## Пример запроса:
+ Получение всех пользовательских полей, находящихся в фиксированной строковой пользовательской колонке (случайно сгенерированной) внутри фиксированной (случайно сгенерированной) таблицы, содержащих строку `the`:
```SQL
SELECT *
FROM field
WHERE columnId = (
    SELECT id FROM "column"
    WHERE columnTypeId = (SELECT id FROM column_type WHERE column_type.name = 'string')
    ORDER BY random() LIMIT 1
) AND value LIKE '%the
```

## Результаты тестирования:
[Данные можно найти по ссылке](https://pastebin.com/vpmzfi3e)
### `sqlite3`
| Rows amount (in the each table) | total DB size | Query time (mean)  | Query time (95%) | 10% worst queries |
| ------------------------------- | ------------- | ------------------ | ---------------- | ----------------- |
| 200 Rows                        | 7.9Mb         | 73ms               | (57 – 109) ms    | (100 – 116) ms    |
| 1000 Rows                       | 39.6Mb        | 86ms               | (47 – 133) ms    | (123 – 157) ms    |
| 5000 Rows                       | 197.7Mb       | 106ms               | (158 – 197) ms    | (100 – 116) ms    |

