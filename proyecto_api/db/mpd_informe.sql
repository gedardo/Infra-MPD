-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mpd_informe
CREATE DATABASE IF NOT EXISTS `mpd_informe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mpd_informe`;

-- Volcando estructura para tabla mpd_informe.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oficina_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `oficina_ID` (`oficina_id`),
  CONSTRAINT `oficina_ID` FOREIGN KEY (`oficina_id`) REFERENCES `oficina` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla mpd_informe.cliente: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT IGNORE INTO `cliente` (`id`, `nombre`, `apellido`, `oficina_id`) VALUES
	(1, 'Usuario nombre', 'Usuario Apellido', 9),
	(2, 'Nombre del cliente', 'Apellido del cliente', 3);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;

-- Volcando estructura para procedimiento mpd_informe.crearUsuario
DELIMITER //
CREATE PROCEDURE `crearUsuario`(
	IN `in_email` VARCHAR(100),
	IN `in_password` VARCHAR(90),
	IN `in_first_name` VARCHAR(50),
	IN `in_last_name` VARCHAR(50)
)
BEGIN
	DECLARE v_done bool DEFAULT FALSE; 
	DECLARE v_db_userId INT DEFAULT NULL;
	DECLARE v_db_err_msg TEXT;
	DECLARE user_exist CONDITION FOR SQLSTATE 'HY000';
	DECLARE duplicate_email CONDITION FOR SQLSTATE '23000';
	DECLARE v_user_created,v_group_id INT DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;  
	
	SET v_group_id = 2;
	
	SELECT id INTO v_db_userId FROM sys_user WHERE email LIKE CONCAT('%',in_email,'%'); -- OR username = in_username;
	IF v_db_userId IS NULL THEN 
			INSERT INTO sys_user(email,password,first_name,last_name) VALUES (in_email,in_password,in_first_name,in_last_name);
			SELECT LAST_INSERT_ID() INTO v_user_created;
			INSERT INTO sys_user_group(sys_user_id,sys_group_id) VALUES (v_user_created,v_group_id);
			IF v_user_created>0 THEN
				SELECT v_user_created,'USUARIO CREADO';
			ELSE
				SELECT v_user_created,'USUARIO NO CREADO';
			END IF;
	ELSE
		SET v_db_err_msg = CONCAT('Usuario existente: ', in_email);
			SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = v_db_err_msg; 
	END IF;
	
	
	
END//
DELIMITER ;

-- Volcando estructura para tabla mpd_informe.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla mpd_informe.inmueble: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `inmueble` DISABLE KEYS */;
INSERT IGNORE INTO `inmueble` (`id`, `nombre`) VALUES
	(111, '9 de julio'),
	(112, '25 de mayo'),
	(113, 'Maipu'),
	(114, 'Santa Fe'),
	(115, 'Banda del Rio Sali');
/*!40000 ALTER TABLE `inmueble` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.oficina
CREATE TABLE IF NOT EXISTS `oficina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inmueble_id` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inmueble_id` (`inmueble_id`),
  CONSTRAINT `inmueble_id` FOREIGN KEY (`inmueble_id`) REFERENCES `inmueble` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla mpd_informe.oficina: ~26 rows (aproximadamente)
/*!40000 ALTER TABLE `oficina` DISABLE KEYS */;
INSERT IGNORE INTO `oficina` (`id`, `inmueble_id`, `nombre`) VALUES
	(1, 111, 'Civil I'),
	(2, 111, 'Civil II'),
	(3, 111, 'Civil III'),
	(4, 111, 'Civil IV'),
	(5, 111, 'Niñez I'),
	(6, 111, 'Niñez II'),
	(7, 111, 'Niñez III'),
	(8, 111, 'Niñez IV'),
	(9, 112, 'Ciad'),
	(10, 112, 'Psicosocial'),
	(11, 112, 'Conclusional'),
	(12, 113, 'Penal I'),
	(13, 113, 'Penal II'),
	(14, 113, 'Penal III'),
	(15, 113, 'Penal IV'),
	(16, 113, 'Penal V'),
	(17, 113, 'Penal VI'),
	(18, 113, 'Penal VII'),
	(19, 113, 'Penal VIII'),
	(20, 113, 'Penal IX'),
	(21, 113, 'OGD'),
	(22, 113, 'OPL'),
	(23, 113, 'OPL'),
	(24, 114, 'Gestion'),
	(25, 114, 'Seguridad e higiene'),
	(26, 114, 'Servicio ocupacional'),
	(27, 115, 'Niñez'),
	(28, 115, 'Civil');
/*!40000 ALTER TABLE `oficina` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_access
CREATE TABLE IF NOT EXISTS `sys_access` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activation_status` int DEFAULT NULL,
  `activation_code` varchar(45) DEFAULT NULL,
  `forgotten_password_code` varchar(45) DEFAULT NULL,
  `expiration` datetime DEFAULT NULL,
  `sys_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_access_sys_user1_idx` (`sys_user_id`),
  CONSTRAINT `fk_sys_access_sys_user1` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_access: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_access` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_access` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_email
CREATE TABLE IF NOT EXISTS `sys_email` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_to` varchar(100) DEFAULT NULL,
  `cc` varchar(500) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `body` longtext,
  `schedule` varchar(1) DEFAULT 'N',
  `mailing_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sent` varchar(1) DEFAULT NULL,
  `sys_email_config_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_email_sys_email_config1_idx` (`sys_email_config_id`),
  CONSTRAINT `fk_sys_email_sys_email_config1` FOREIGN KEY (`sys_email_config_id`) REFERENCES `sys_email_config` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80686 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_email: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_email` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_email` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_email_config
CREATE TABLE IF NOT EXISTS `sys_email_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email_from` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `smtp` varchar(200) DEFAULT NULL,
  `port` int DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_email_config: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_email_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_email_config` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_error
CREATE TABLE IF NOT EXISTS `sys_error` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `sys_session_id` int DEFAULT NULL,
  `sys_error_code_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_errors_sys_sessions1_idx` (`sys_session_id`),
  KEY `fk_sys_error_sys_error_code1_idx` (`sys_error_code_id`),
  CONSTRAINT `fk_sys_error_sys_error_code1` FOREIGN KEY (`sys_error_code_id`) REFERENCES `sys_error_code` (`id`),
  CONSTRAINT `fk_sys_errors_sys_sessions1` FOREIGN KEY (`sys_session_id`) REFERENCES `sys_session` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_error: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_error` DISABLE KEYS */;
INSERT IGNORE INTO `sys_error` (`id`, `date_time`, `ip_address`, `url`, `sys_session_id`, `sys_error_code_id`) VALUES
	(397, '2022-09-22 12:31:04', '::1', '/auth/login', NULL, 2),
	(398, '2022-09-22 14:25:46', '::1', '/v1/oficina/inmueble', NULL, 6),
	(399, '2022-09-26 12:03:57', '::1', '/auth/login', NULL, 2),
	(400, '2022-09-26 12:06:23', '::1', '/auth/user/', NULL, 6),
	(401, '2022-09-26 12:08:12', '::1', '/auth/user/', NULL, 6),
	(402, '2022-09-26 12:08:12', '::1', '/auth/user/', NULL, 6);
/*!40000 ALTER TABLE `sys_error` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_error_code
CREATE TABLE IF NOT EXISTS `sys_error_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_error_code: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_error_code` DISABLE KEYS */;
INSERT IGNORE INTO `sys_error_code` (`id`, `description`) VALUES
	(1, 'Invalid User'),
	(2, 'Invalid Password'),
	(3, 'Inactive User'),
	(4, 'Blocked User'),
	(5, 'Session Expired'),
	(6, 'Invalid Session'),
	(7, 'Access Denied');
/*!40000 ALTER TABLE `sys_error_code` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_fcm
CREATE TABLE IF NOT EXISTS `sys_fcm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(45) DEFAULT NULL,
  `token` varchar(5000) DEFAULT NULL,
  `sys_session_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fcm_sys_session1_idx` (`sys_session_id`),
  CONSTRAINT `fk_fcm_sys_session1` FOREIGN KEY (`sys_session_id`) REFERENCES `sys_session` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_fcm: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_fcm` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_fcm` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_group
CREATE TABLE IF NOT EXISTS `sys_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_group: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_group` DISABLE KEYS */;
INSERT IGNORE INTO `sys_group` (`id`, `name`, `description`) VALUES
	(1, 'Administradores', 'Administrador del Sistema'),
	(2, 'Atención al Cliente', 'Personal de atención al cliente');
/*!40000 ALTER TABLE `sys_group` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_group_permission
CREATE TABLE IF NOT EXISTS `sys_group_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deny` varchar(1) DEFAULT 'N',
  `sys_group_id` int NOT NULL,
  `sys_permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_type_permission_sys_type1_idx` (`sys_group_id`),
  KEY `fk_sys_type_permission_sys_permission1_idx` (`sys_permission_id`),
  CONSTRAINT `fk_sys_type_permission_sys_permission1` FOREIGN KEY (`sys_permission_id`) REFERENCES `sys_permission` (`id`),
  CONSTRAINT `fk_sys_type_permission_sys_type1` FOREIGN KEY (`sys_group_id`) REFERENCES `sys_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_group_permission: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_group_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_group_permission` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_login_attempt
CREATE TABLE IF NOT EXISTS `sys_login_attempt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `sys_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_login_attempts_sys_users1_idx` (`sys_user_id`),
  CONSTRAINT `fk_sys_login_attempts_sys_users1` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_login_attempt: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_login_attempt` DISABLE KEYS */;
INSERT IGNORE INTO `sys_login_attempt` (`id`, `ip_address`, `date_time`, `sys_user_id`) VALUES
	(1, '::1', '2022-09-22 12:29:11', 17),
	(2, '::1', '2022-09-22 12:31:04', 17),
	(3, '::1', '2022-09-26 12:03:57', 17);
/*!40000 ALTER TABLE `sys_login_attempt` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_picture
CREATE TABLE IF NOT EXISTS `sys_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pic` text,
  `sys_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sys_user_id` (`sys_user_id`),
  CONSTRAINT `sys_picture_ibfk_1` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla mpd_informe.sys_picture: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_picture` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_session
CREATE TABLE IF NOT EXISTS `sys_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(50) DEFAULT NULL,
  `dt_start` datetime DEFAULT NULL,
  `dt_finished` datetime DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `sys_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_sessions_sys_users1_idx` (`sys_user_id`),
  CONSTRAINT `fk_sys_sessions_sys_users1` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=456 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_session: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_session` DISABLE KEYS */;
INSERT IGNORE INTO `sys_session` (`id`, `ip_address`, `dt_start`, `dt_finished`, `user_agent`, `status`, `sys_user_id`) VALUES
	(442, '::1', '2022-09-22 12:29:05', NULL, 'PostmanRuntime/7.29.0', 1, 17),
	(443, '::1', '2022-09-22 12:31:09', NULL, 'PostmanRuntime/7.29.0', 1, 17),
	(444, '::1', '2022-09-22 14:20:49', NULL, 'PostmanRuntime/7.29.0', 1, 20),
	(445, '::1', '2022-09-26 11:47:16', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(446, '::1', '2022-09-26 12:02:31', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(447, '::1', '2022-09-26 12:03:47', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(448, '::1', '2022-09-26 12:03:50', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(449, '::1', '2022-09-26 12:05:11', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(450, '::1', '2022-09-26 12:05:51', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(451, '::1', '2022-09-26 12:06:23', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(452, '::1', '2022-09-26 12:08:12', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(453, '::1', '2022-09-26 12:08:12', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(454, '::1', '2022-09-26 12:09:55', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17),
	(455, '::1', '2022-09-26 12:22:43', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 1, 17);
/*!40000 ALTER TABLE `sys_session` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_user
CREATE TABLE IF NOT EXISTS `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `dni` int DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `security_code` varchar(5) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `active` int DEFAULT '1',
  `is_admin` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mpd_informe.sys_user: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT IGNORE INTO `sys_user` (`id`, `email`, `password`, `first_name`, `last_name`, `dni`, `phone`, `security_code`, `created_on`, `active`, `is_admin`) VALUES
	(17, 'jcaniparoli@mpdtucuman.gob.ar', '$2a$04$1Xjwb6W0Zjm8ip46LUCOsuY8Fn0dzR5lPiuto/ZWe1SYXfFgQO4la', 'Javier', 'Caniparoli', NULL, NULL, NULL, '2022-09-22 12:28:34', 1, 1),
	(19, 'admin1@admin1.com', '$2b$04$n10HpnsFj36tfZidF8vA3O7qhlLrofBpTRCUV3JOnmTzU.iweY9ay', 'Prueba', 'POSTMAN', NULL, NULL, NULL, '2022-09-22 12:41:18', 1, 0),
	(20, 'gnavarro@mpdtucuman.gob.ar', '$2a$04$1Xjwb6W0Zjm8ip46LUCOsuY8Fn0dzR5lPiuto/ZWe1SYXfFgQO4la', 'Gerardo', 'Navarro', NULL, NULL, NULL, '2022-09-22 12:28:34', 1, 1);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.sys_user_group
CREATE TABLE IF NOT EXISTS `sys_user_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sys_user_id` int DEFAULT NULL,
  `sys_group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sys_user_id` (`sys_user_id`),
  KEY `sys_group_id` (`sys_group_id`),
  CONSTRAINT `sys_user_group_ibfk_1` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sys_user_group_ibfk_2` FOREIGN KEY (`sys_group_id`) REFERENCES `sys_group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla mpd_informe.sys_user_group: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_user_group` DISABLE KEYS */;
INSERT IGNORE INTO `sys_user_group` (`id`, `sys_user_id`, `sys_group_id`) VALUES
	(1, 17, 1),
	(4, 19, 2),
	(5, 20, 1);
/*!40000 ALTER TABLE `sys_user_group` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.tarea
CREATE TABLE IF NOT EXISTS `tarea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sys_user_id` int NOT NULL,
  `oficina_id` int NOT NULL,
  `tipo_tarea_id` int NOT NULL,
  `cliente_id` int DEFAULT NULL,
  `comentario` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`sys_user_id`),
  KEY `oficina` (`oficina_id`),
  KEY `tipo_tarea` (`tipo_tarea_id`),
  KEY `cliente` (`cliente_id`),
  CONSTRAINT `cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `oficina` FOREIGN KEY (`oficina_id`) REFERENCES `oficina` (`id`),
  CONSTRAINT `tipo_tarea` FOREIGN KEY (`tipo_tarea_id`) REFERENCES `tipo_tarea` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla mpd_informe.tarea: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
INSERT IGNORE INTO `tarea` (`id`, `sys_user_id`, `oficina_id`, `tipo_tarea_id`, `cliente_id`, `comentario`, `observacion`, `created_at`) VALUES
	(1, 17, 9, 4, 1, NULL, NULL, '2022-09-22 13:28:29'),
	(2, 17, 9, 5, 1, NULL, NULL, '2022-09-21 13:28:29'),
	(3, 17, 9, 2, NULL, NULL, NULL, '2022-09-21 13:28:29'),
	(4, 17, 7, 3, 1, 'Este es el comentario que escribiria el usuario, NO ES OBLIGATORIO', 'Una observacion que NO ES OBLIGATORIA', '2022-09-22 14:41:13'),
	(5, 17, 7, 2, NULL, 'Este es el comentario que escribiria el usuario, NO ES OBLIGATORIO', 'Una observacion que NO ES OBLIGATORIA', '2022-09-22 14:41:39');
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;

-- Volcando estructura para tabla mpd_informe.tipo_tarea
CREATE TABLE IF NOT EXISTS `tipo_tarea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla mpd_informe.tipo_tarea: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_tarea` DISABLE KEYS */;
INSERT IGNORE INTO `tipo_tarea` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Reemplazo toner', 'Se reemplaza toner de impresora Lexmark ip: '),
	(2, 'Instalacion impresora', 'Se instala y configura impresora en oficina {{oficina}}'),
	(3, 'Instalación SAE', 'Se instala y configura SAE en puesto de trabajo de {{usuario}}'),
	(4, 'Activación Office', 'Se activa paquete Office en puesto de trabajo de {{usuario}}'),
	(5, 'Contraseña Portal y Recibo', 'Se restablece contraseña al {{usuario}}'),
	(6, 'Config. Outlook', 'Se configura Outlook en puesto de trabajo de {{usuario}}'),
	(7, 'Config de rendimiento', 'Se optimiza rendimiento en puesto de trabajo de {{usuario}}'),
	(8, 'Acceso a Lex', 'Se configura acceso a Lex en puesto de trabajo de {{usuario}}'),
	(9, 'Reinicio PC', 'Se asiste a {{usuario}} que no podía encender su notebook, se soluciona el problema forzando el reinicio de su puesto de trabajo'),
	(10, 'Otra Tarea', '{{descripcion}}'),
	(11, 'Nombre de la tarea', 'Descripcion de la tarea');
/*!40000 ALTER TABLE `tipo_tarea` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
