INSERT INTO customer (id,firstName,lastName,version) VALUES (1 /*not nullable*/,'Esteve','Aviles',0);
INSERT INTO ORDER_ (id,orderNumber,version,customer_id) VALUES (1 /*not nullable*/,'Order 1',0,1);
INSERT INTO ORDER_ (id,orderNumber,version,customer_id) VALUES (2 /*not nullable*/,'Order 2',0,1);
