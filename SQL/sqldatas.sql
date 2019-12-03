CREATE DATABASE eatSSU;

use eatSSU;

-- //음식점 릴레이션
CREATE TABLE restaurant(
    storeName CHAR(15) NOT NULL,
    storeAddr VARCHAR(30),
    phoneNumber CHAR(15),
    startTime time,
    endTime time,
    score INT,
    category CHAR(5),
    PRIMARY key(storeName)
);
-- //리뷰 릴레이션
CREATE TABLE review(
    reviewID INT NOT NULL,
    storeName CHAR(15) NOT NULL,
    nickname CHAR(15) NOT NULL,
    password CHAR(4) NOT NULL,
    reviewDesc VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    PRIMARY key(reviewID,storeName),
    FOREIGN key(storeName) REFERENCES restaurant(storeName)
);

--------------------------------------------------------------------
INSERT INTO restaurant VALUE( '백채김치찌개' , '서울특별시 동작구 상도로61길 35 금영빌딩','02-812-6889','11:00','0:00',4,'한식');
INSERT INTO restaurant VALUE( '김가네','서울특별시 동작구 상도동 사당로 12','02-825-9295','9:00','21:00',3,'한식');
INSERT INTO restaurant VALUE( '지지고','상도동 505-6번지 106호 동작구 서울특별시 KR','02-6012-8246','10:00','22:00',4,'한식');
INSERT INTO restaurant VALUE('연래춘','서울특별시 동작구 상도1동 505-7 2 층','02-816-2007','9:00','21:00',4,'중식');
INSERT INTO restaurant VALUE( '취향','서울특별시 동작구 상도동 501-2','02-3280-5511',NULL,NULL,4,'중식');
INSERT INTO restaurant VALUE('우마이','서울특별시 동작구 상도동 503-1','02-3280-1910','11:30','20:00',4,'일식');
INSERT INTO restaurant VALUE('마루스시','서울특별시 동작구 상도동 485','02-814-3361','12:00','22:00',5,'일식');
INSERT INTO restaurant VALUE( '맥도날드','서울특별시 동작구 상도동 505-5',NULL,'24:00:00','0:00:00',4,'양식');
INSERT INTO restaurant VALUE( '샤로스톤','서울특별시 동작구 상도동 500','02-825-1616','11:30','21:00',5,'양식');
INSERT INTO restaurant VALUE( '은하수식당','상도동 505-3번지 1층 동작구 서울특별시 KR','02-822-8425',NULL,NULL,NULL,'양식');
INSERT INTO restaurant VALUE( '풍년집','서울특별시 동작구 상도동 500-16','02-822-2949','11:00','23:00',4,'양식');
INSERT INTO restaurant VALUE( '은하수식당','상도동 505-3번지 1층 동작구 서울특별시 KR','02-822-8425',NULL,NULL,NULL,'양식');
INSERT INTO restaurant VALUE( '청년다방','서울특별시 동작구 상도동 502-5','02-823-7319',NULL,NULL,4,'한식');
-------------------------------------------------------------------------------------------------------------------------------------




