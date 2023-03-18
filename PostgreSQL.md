 # PostgreSQL
 
 ##  download
*  [runtime](https://postgresapp.com/downloads.html)
*  [GUI](https://eggerapps.at/postico/v1.php)


learn
https://docs.postgresql.tw/the-sql-language/sql-syntax/4.3.-han-shu-hu-jiao


## add PATH to zshrc
添加PostgreSQL環境變數就可以指定psql cli默認執行的lib位置
```javascript=
~/.zshrc

# psql
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/15/bin
```

以上等同
`> /Applications/Postgres.app/Contents/Versions/15/bin/psql -p5432 "danny"`

## DB command

使用psql進入db，在pq中所有指令開頭都是反斜線開頭 `\help`則可以查看當前可用的指令（跟你設定權限有關）。
![](https://i.imgur.com/8r4VF9r.png)

`\?`則是指令查詢工具
`\l`列出當前可用的db
![](https://i.imgur.com/KEpKXKc.png)

### 創建db
使用pq的sql指令創建，注意在pq中所有的SQL指令結尾都一定要加;不然指令不會成功
![](https://i.imgur.com/6PqpCHd.png)

在查看pq admin這樣我們就成功創建test db了
![](https://i.imgur.com/1N6Gl5J.png)

### 切換DB
![](https://i.imgur.com/wfiorK2.png)



### data type  
* char	資料有固定長度，並且都為英文數字。
* nchar	資料有固定長度，但不確定是否皆為英文數字。
* varchar	資料沒有固定長度，並且都為英文數字。
* nvarchar	資料沒有固定長度，且不確定是否皆為英文數字。

### 創建tabel

在創建table時psql很貼心會偵測你（）的位置來判斷增新的結尾，）代表整個table的schema，;則是執行的符號
![](https://i.imgur.com/ouM4PyG.png)
![](https://i.imgur.com/TP0WZQA.png)

### 查看當前db的table的schema
![](https://i.imgur.com/k69l1CW.png)

### 查看schema info

![](https://i.imgur.com/NOjz9bu.png)

### Insert Into Database
![](https://i.imgur.com/EV8QRRJ.png)

### 查看table
![](https://i.imgur.com/v4CCa99.png)

### 生成假資料
[mockdata](https://www.mockaroo.com/)

### 從SQL黨載入
![](https://i.imgur.com/HAQ9DYg.png)


```javascript
//查看person 所有欄位
danny=# SELECT * FROM PERSON

//查看person中欄位是first_name、last_name的資料
danny=# SELECT first_name,last_name FROM PERSON

//將資料已country_of_birth排序 [asc|desc]
danny=# SELECT first_name,last_name FROM PERSON ORDER BY country_of_birth ASC

//將資料先已id排再以email排序
danny=# select * from person order by id,email;

//distinct filter重複資料
danny=# 
select distinct  country_of_birth from person 
order by country_of_birth;

//combine and in where
danny=# 
select * from person
where gender = 'Female' 
AND ( country_of_birth='Japan' OR country_of_birth='China' );

danny=# 
select * from person
where gender = 'Female'
AND ( country_of_birth in ('Japan','China') )
order by country_of_birth;
```

### condition select
![](https://i.imgur.com/BKbGduG.png)


### like是相似的operator語法，返回fileds中有符合like的敘述，%代表萬用字符
```javascript


danny=# 
select * from person
where email like '%@google.com.%';

 id  | first_name | last_name |          email           | gender | date_of_birth | country_of_birth
-----+------------+-----------+--------------------------+--------+---------------+------------------
  67 | Der        | Al Hirsi  | dalhirsi1u@google.com.hk | Male   | 2022-10-03    | Ghana
 201 | Maris      | Lowey     | mlowey5k@google.com.hk   | Female | 2022-05-23    | United States
 523 | Bobbye     | Aiken     | baikenei@google.com.br   | Female | 2022-07-26    | China
 635 | Baillie    | Sowle     | bsowlehm@google.com.hk   | Male   | 2022-12-31    | Thailand
 697 | Crissie    | Barcke    | cbarckejc@google.com.br  | Female | 2022-09-23    | Thailand
 749 | Norman     | Skyme     | nskymeks@google.com.au   | Male   | 2022-06-17    | Sweden
(6 rows)
    
//________@% 代表找尋7個字元後加@的email
danny=# 
 select * from person 
 where email like '________@%'
 limit 5;

 id | first_name | last_name |          email          | gender | date_of_birth | country_of_birth
----+------------+-----------+-------------------------+--------+---------------+------------------
  9 | Freddy     | Savege    | fsavege8@pinterest.com  | Male   | 2022-11-16    | Brazil
 10 | Alex       | Grover    | agrover9@wisc.edu       | Male   | 2023-01-12    | Indonesia
 18 | Oralla     | Harley    | oharleyh@reddit.com     | Female | 2022-03-30    | China
 32 | Sarette    | Walder    | swalderv@bravesites.com | Female | 2022-02-18    | Netherlands
 33 | Lynne      | Darwin    | ldarwinw@scribd.com     | Female | 2022-10-28    | Cuba
(5 rows)
```
### group by
```javascript
danny=# 
select country_of_birth,count(*) from person
group by country_of_birth
order by country_of_birth;
                              


```
![](https://i.imgur.com/NKMtKSD.png)

### having 接在group by 後面

[aggregate doc](https://www.postgresql.org/docs/9.5/functions-aggregate.html)
```javascript

danny=# 
select country_of_birth,count(*) from person
group by country_of_birth
having count(*)>40
order by country_of_birth;

 country_of_birth | count
------------------+-------
 China            |   195
 Indonesia        |   120
 Philippines      |    43
 Russia           |    50
(4 rows)


```
### aggregate
```javascript 
//get avage data
danny=# select MAX(price) from car;
    max
-----------
 $99900.20
(1 row)

danny=# 
select make,model,min(price) from car
group by make ,model;
```

### Operators
在sql中可以透過Operator去計算filed新值
```javascript
danny=#
select id , make ,model,Round( price *.10,2),Round( price-(price *.10),2),price from car;
```

![](https://i.imgur.com/NzfqfKw.png)

### Alias
甚至你可以幫你的tabel命名
```javascript
danny=# 
select id , make ,model,Round( price *.10,2) as ten_percent,Round( price-(price *.10),2) as discount_after_10_percent,price as origin_price from car;
```
![](https://i.imgur.com/dW64jeF.png)


### coalesce
當我們下指令列出user所有email時你會發現有些人沒有email

```javascript
danny=# slect email from person;
```
![](https://i.imgur.com/0vKTn1H.png)

這時候就可以下coalesce
```javascript
danny=# select coalesce(email,'envaild email') from person;
```
**hint** : 
coalesce(arg1,arg2,...) 返回第一個非null的值

![](https://i.imgur.com/1PXubzA.png)

### nullif

```javascript
NULLIF ( expression , expression )
```
NULLIF如果兩個express相等就回傳null，如果不相等就回傳第一個值。
```javascript

danny=# select nullif(100,100);
 nullif
--------

(1 row)

danny=# select nullif(100,19);
 nullif
--------
    100
(1 row)

//demo1
danny=# select coalesce(10/nullif(0,0),0);
 coalesce
----------
        0
(1 row)

//demo2
danny=# select coalesce(null,0);
 coalesce
----------
        0
(1 row)

//結合coalesce demo1跟demo2的做法是一樣的。
```
### time format
[備註](https://docs.postgresql.tw/the-sql-language/functions-and-operators/date-time-functions-and-operators)
```javascript

danny=# select now();
              now
-------------------------------
 2023-02-25 20:04:00.925601+08
(1 row)

danny=# select now()::date;
    now
------------
 2023-02-25
(1 row)

danny=# select now()::time;
       now
-----------------
 20:04:19.478294
(1 row)

//在psql中日期可以累加透過interval(間隔)運算符推做日期加總
danny=# select date '2001-09-28' + interval '1 hours';
   ?column?
---------------------
 2001-09-28 01:00:00
(1 row)
```
### 時間運算
```javascript
// etc 找出去年的時間
danny=# select now() - interval '1 yaers';
   ?column?
---------------------
 2022-02-25 20:15:12.742052+08
(1 row)
```
但你會發現output格式多了小時，這時可以透過formate decorator只計算日期
```javascript
danny=# select now()::date - interval '1 years';
      ?column?
---------------------
 2022-02-25 00:00:00
(1 row)
```
或是可以在簡化成以下的output
```javascript
danny=# select (now() - interval '1 years')::date;
    date
------------
 2022-02-25
(1 row)

//extract 
danny=# select extract(year from now());
 extract
---------
    2023
(1 row)

//甚至可以選取世紀
danny=# select extract(century from now());
 extract
---------
      21
(1 row)
```

### 計算歲數
```javescript
danny=# 
select first_name ,last_name,date_of_birth,age(now()::date,date_of_birth) as age from person;
```
![](https://i.imgur.com/mi6P4TI.png)

### 修改table 欄位（ALTER TABLE）

移除pkey,constraint則是用來約束欄位的宣告例如宣告pkey就要加constraint
```javascript=
danny=# 
alter table person drop constraint person_pkey;
```

新增主鍵，注意如果要宣告的欄位如果資料重複會無法宣告主鍵
```javascript


danny=# select * from person where id=1;

 id | first_name | last_name |          email           | gender | date_of_birth | country_of_birth
----+------------+-----------+--------------------------+--------+---------------+------------------
  1 | Rafa       | Hallagan  | rhallagan0@amazonaws.com | Female | 2022-12-20    | Japan
  1 | Rafa       | Hallagan  | rhallagan0@amazonaws.com | Female | 2022-12-20    | Japan
(2 rows)

danny=# alter table person add primary key(id);
//如果你要射pk的欄位data有重複就不能設置主鍵
ERROR:  could not create unique index "person_pkey"
DETAIL:  Key (id)=(1) is duplicated.


//解決方法重新新增唯一性data
danny=# delete from person where id = 1
danny=# insert into person (id,first_name, last_name, email, gender, date_of_birth, country_of_birth) values (1,'Rafa', 'Hallagan', 'rhallagan0@amazonaws.com', 'Female', '12/20/2022', 'Japan');

```

### 查詢email重否重複
```javascript
danny=# select email ,count(*) from person
group by email;
```          
圖中表示有304位person是沒有email的
![](https://i.imgur.com/A8laTIM.png)

### 將group by 結果做having
裡會發現304個null email，而duplicate email則是rhallagan0@amazonaws.com跟 rchaster1@wiley.com ，分別是3位跟2位
```javascript                         
danny=# select email,count(*) from person group by email having count(*)>1;
                                                                      
          email           | count
--------------------------+-------
                          |   304
 rhallagan0@amazonaws.com |     3
 rchaster1@wiley.com      |     2
(3 rows)
```


這時候將duplicate的email list出來，你會發現當我要發送rchaster1@wiley.com 的mail，你會不知道到底發給誰，這時候我們就要做unique fileds
```javascript
danny=# select * from person where email ='rchaster1@wiley.com';
  id  | first_name | last_name |        email        | gender | date_of_birth | country_of_birth
------+------------+-----------+---------------------+--------+---------------+------------------
    2 | Rich       | Chaster   | rchaster1@wiley.com | Male   | 2022-08-25    | Germany
 1003 | Danny       | Wu   | rchaster1@wiley.com | Male   | 2022-11-06    | Germany
(2 rows)
```
先移除duplicate的data
```javascript=
danny=# select * from person where email ='rchaster1@wiley.com';
  id  | first_name | last_name |        email        | gender | date_of_birth | country_of_birth
------+------------+-----------+---------------------+--------+---------------+------------------
    2 | Rich       | Chaster   | rchaster1@wiley.com | Male   | 2022-08-25    | Germany
 1003 | Rich       | Chaster   | rchaster1@wiley.com | Male   | 2022-08-25    | Germany
(2 rows)

danny=# delete from person where id = 1003;


danny=# select * from person where email ='rhallagan0@amazonaws.com';
  id  | first_name | last_name |          email           | gender | date_of_birth | country_of_birth
------+------------+-----------+--------------------------+--------+---------------+------------------
 1001 | Rafa       | Hallagan  | rhallagan0@amazonaws.com | Female | 2022-12-20    | Japan
 1002 | Rafa       | Hallagan  | rhallagan0@amazonaws.com | Female | 2022-12-20    | Japan
    1 | Rafa       | Hallagan  | rhallagan0@amazonaws.com | Female | 2022-12-20    | Japan
(3 rows)

danny=# delete from person where id in ('1001','1002');
```

當使用constraint後的field，如果在insert duplicate的data就會出現警告，
constraint 用於約束table field用法會是[method] constraint [constraint_key] [限制條件]
```
danny=#  alter table person add constraint unique_email_address UNIQUE(email);

danny=# insert into person (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Rich', 'Chaster', 'rchaster1@wiley.com', 'Male', '8/25/2022', 'Germany');
ERROR:  duplicate key value violates unique constraint "unique_email_address"
DETAIL:  Key (email)=(rchaster1@wiley.com) already exists
```

移除constraint [key]
```javascript
danny=# alter table person drop constraint "unique_email_address";
ALTER TABLE
```

distinct常用於select field中資料的type
```javascript
danny=# select distinct gender from person;
   gender
-------------
 Genderqueer
 Bigender
 hello
 Genderfluid
 Male
 Non-binary
 Polygender
 Female
 Agender
(9 rows)
```

### 刪除不要的option資料
```javascript
danny=# select distinct gender from person;
   gender
-------------
 Male
 Non-binary
 Polygender
 Female
 hello
 Agender
 Genderfluid
(7 rows)

danny=# delete from person
danny-# where gender in ('Non-binary','Polygender','hello','Agender','Genderfluid');
```

之後新增constraint到table field這樣之後insert data時，gender必須是'Male','Female'否則會報錯
```javascript
danny=# alter table person add constraint gender_constraint check (gender in ('Male','Female'));
```

### delete table
```javascript
danny=# delete from person where id = '501';
DELETE 1
```
### update table
```javascript
danny=# UPDATE  person   SET email='hiunji64@gmail.com' WHERE id =13;
UPDATE 1

danny=# UPDATE person SET first_name='Danny' ,last_name='Wu' WHERE id =14;
```
### 檢查constraint欄位，如果value duplicate就不操作db
```javascript
danny=# insert into person (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Rich', 'Chaster', 'hello@wiley.com', 'Male', '8/25/2022', 'Germany') ON CONFLICT(email) DO NOTHING;
INSERT 0 0
```
ON CONFLICT的參數只能是有constraint過的欄位如果沒有會報錯，例如ON CONFLICT(first_name) ，DO NOTHING代表一個action,如果inset的data沒有符合constraint的要求會就不做db操作

### conflict update
```javascript
danny=# select * from person where id=1006;
  id  | first_name | last_name |       email        | gender | date_of_birth | country_of_birth
------+------------+-----------+--------------------+--------+---------------+------------------
 1006 | Rich       | Chaster   | hello@wiley.com.uk | Male   | 2022-08-25    | Germany
(1 row)

danny=# insert into person (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Danny', 'Wu', 'Danny@wiley.com.uk', 'Male', '8/25/2022', 'Germany') ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email,first_name=EXCLUDED.first_name,last_name=EXCLUDED.last_name;
INSERT 0 1
danny=# select * from person where id=1006;
  id  | first_name | last_name |       email        | gender | date_of_birth | country_of_birth
------+------------+-----------+--------------------+--------+---------------+------------------
 1006 | Rich       | Chaster   | hello@wiley.com.uk | Male   | 2022-08-25    | Germany
(1 row)
```
我們可以透過ON CONFLICT後重寫入db資料

### 主鍵外來鍵
```sql
create table person (
	id bigserial NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50),
	gender VARCHAR(50) NOT NULL,
	date_of_birth DATE NOT NULL,
	car_id BIGINT ,
	country_of_birth VARCHAR(50),
	CONSTRAINT "person_car_fkey" FOREIGN KEY ("car_id") REFERENCES "car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
	-- CONSTRAINT car_id BIGINT REFERENCES car (id),
	-- UNIQUE(car_id)
);

```
將id為1的person設定car編號
```javascript
danny=#  update person set car_id=2 where id=1
```

如果今天foreign key不存在sql會給你提示
```javascript
danny=# update person set car_id = 10000 where id = 10;
ERROR:  insert or update on table "person" violates foreign key constraint "person_car_fkey"
DETAIL:  Key (car_id)=(10000) is not present in table "car".
```
### 更改result select format
\x是讓你決定你的Expanded display ，他是一個toggle 指令，呼叫一次開啟在呼叫一次關閉
```javascript
danny=# \x
Expanded display is on.

danny=# select * from person;


-[ RECORD 1 ]----+-----------------------------------
id               | 2
first_name       | Win
last_name        | Twede
email            | wtwede2@so-net.ne.jp
gender           | Male
date_of_birth    | 2022-10-06
car_id           |
country_of_birth | Colombia
-[ RECORD 2 ]----+-----------------------------------
id               | 3
first_name       | Obie
last_name        | Fitter
email            |
gender           | Male
date_of_birth    | 2023-02-02
car_id           |
country_of_birth | Philippines

danny=# \x
Expanded display is off.
```

### inner join

inner join是table的fk 與reference的pk的聯合查詢，指令 join [fk_table] on [pk_table][field_id]=[fk_table][field_id] ;
```javascript
danny=# select * from person
danny-# join car on person.car_id = car.id;

-[ RECORD 1 ]----+-------------------------
id               | 10
first_name       | Shepard
last_name        | Cana
email            | scanaa@cloudflare.com
gender           | Male
date_of_birth    | 2022-07-23
car_id           | 1000
country_of_birth | Ethiopia
id               | 1000
make             | Chevrolet
model            | Express 1500
price            | 52723.00
-[ RECORD 2 ]----+-------------------------
id               | 1
first_name       | Rafa
last_name        | Hallagan
email            | rhallagan0@amazonaws.com
gender           | Female
date_of_birth    | 2022-12-20
car_id           | 1
country_of_birth | Japan
id               | 1
make             | MINI
model            | Cooper Clubman
price            | 30005.00
```
你會發現output顯示太多欄位，就可以在select時指定要顯示的內容如下：
```javascript
danny=# select person.first_name,person.email,car.make from person
join car on person.car_id=car.id;
-[ RECORD 1 ]------------------------
first_name | Shepard
email      | scanaa@cloudflare.com
make       | Chevrolet
-[ RECORD 2 ]------------------------
first_name | Rafa
email      | rhallagan0@amazonaws.com
make       | MINI
```