CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE TABLE emails (
  id INT NOT NULL AUTO_INCREMENT,
  subject VARCHAR(45) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  starred BIT NOT NULL DEFAULT 0,
  read BIT NOT NULL DEFAULT 0,
  span BIT NOT NULL DEFAULT 0,
  trashed BIT NOT NULL DEFAULT 0,
  arquived BIT NOT NULL DEFAULT 0,
  user_sender_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_emails_users1_idx (user_sender_id ASC),
  CONSTRAINT fk_emails_users1
    FOREIGN KEY (user_sender_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE labels (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  emails_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_labels_emails1_idx (emails_id ASC),
  CONSTRAINT fk_labels_emails1
    FOREIGN KEY (emails_id)
    REFERENCES emails (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE receiver_users (
  users_id INT NOT NULL,
  emails_id INT NOT NULL,
  PRIMARY KEY (users_id, emails_id),
  INDEX fk_users_has_emails_emails1_idx (emails_id ASC),
  INDEX fk_users_has_emails_users1_idx (users_id ASC),
  CONSTRAINT fk_users_has_emails_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_users_has_emails_emails1
    FOREIGN KEY (emails_id)
    REFERENCES emails (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)