SonarQube Installation
======================

_For SonarQube version **5.1.1**_

SonarCube consists of two main parts: and the code analyzer (SonarQube Runner) and the analysis aggregator (SonarQube). When executed, the SonarQube Runner uses a project-specific configuration file to analyze the code, and the results of that analysis are sent to the SonarQube aggregator for storage and reporting.

While both SonarQube and the SonarQube Runner can be located on the same computer, the more likely scenario is that the SonarQube Runner is run on a separate computer and reports the results to a central SonarQube aggregator used by everyone on the project (or the enterprise). This installation document will assume the latter scenario.

## Required: Java ##

As SonarQube is written in Java, Java will need to be installed on the computer running each component. SonarQube requires the Java Runtime Environment (JRE) Standard Edition (SE) version 1.7 or higher. The Java Development Kit (JDK) is not required.

>**Download the version of Java appropriate to your environment [from Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html).**

On Windows, you will also need to [create an environment variable](https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/sysdm_advancd_environmnt_addchange_variable.mspx?mfr=true) called `JAVA_HOME`, and include that in your `PATH` environment variable.

If, for example, you installed Java SE 8u45 (1.8 update 45) to the default location, you should set the `JAVA_HOME` environment variable to `C:\Program Files\Java\jre1.8.0_45`. Then add `;%JAVA_HOME%\bin` to the end of the `PATH` environment variable.

>Items in the `PATH` environment variables are separated with a semicolon, but be careful not to leave a trailing semicolon at the end of the variable value.

You can test everything is set up correctly using the command prompt:

```
> java -version
java version "1.8.0_45"
Java(TM) SE Runtime Environment (build 1.8.0_45-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.45-b02, mixed mode)
```

# Installing SonarQube (Aggregator) #

In addition to Java, SonarQube also requires a database to store the results. SonarQube comes bundled with the H2 database, but it's only for testing, not production purposes. SonarQube also supports Oracle, Postgres, SQL Server and MySQL.

## Optional: Use MySQL ##

Install [MySQL Community Edition](http://dev.mysql.com/downloads/windows/installer/5.6.html). Log in as root via the command line and create the schema and user for SonarQube to use.

```sql
CREATE DATABASE sonar CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE USER 'sonar' IDENTIFIED BY '<password you picked>';

GRANT ALL ON sonar.* TO 'sonar'@'%' IDENTIFIED BY '<password you picked>';
GRANT ALL ON sonar.* TO 'sonar'@'localhost' IDENTIFIED BY '<password you picked>';

FLUSH PRIVILEGES;
```

## SonarQube ##

### Install ###

SonarQube will run as a service so that it automatically restarts after a reboot. First, [download SonarQube](http://www.sonarqube.org/downloads/) and unzip it to the directory of your choice.

>All paths listed below are relative to the directory where SonarQube was unzipped

Once unpacked, SonarQube can be installed as a service. Navigate to `.\bin\windows-x86-64\`, right-click on `InstallNTService.bat` and select *Run as administrator*. This will install the SonarQube service, but will not start it.

### Configure ###

Edit the SonarQube configuration file at `.\conf\sonar.properties`

>There are two formats for properties in this file: one where the key and the value are separated by a colon and whitespace doesn’t matter, and ones where the key and value are separated by an equal sign and whitespace does matter These two formats aren’t interchangeable, so properties you see with colons initially should retain those colons.

Find, uncomment and make the following changes to these lines:

```ini
# User credentials.
# Permissions to create tables, indices and triggers must be granted to JDBC user.
# The schema must be created first.
sonar.jdbc.username=sonar
sonar.jdbc.password=<password you picked>

#----- MySQL 5.x
# Only InnoDB storage engine is supported (not myISAM).
# Only the bundled driver is supported.
sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConfigs=maxPerformance

#--------------------------------------------------------------------------------------------------
# UPDATE CENTER

# HTTP proxy (default none)
#http.proxyHost=
#http.proxyPort=

# NT domain name if NTLM proxy is used
#http.auth.ntlm.domain=

# proxy authentication. The 2 following properties are used for HTTP and SOCKS proxies.
#http.proxyUser=
#http.proxyPassword=
```

All batch files need to be run as admin

change account sonarqube runs under

### Troubleshooting ###

If you run into any problems trying to install and run SonarQube as a Windows service, the first thing to do is check the log located at `.\`

The most common problem to run into when trying to install and run SonarQube as a Windows service is lacking the permissions to read/write to the temp directory. 

# Installing SonarQube Runner #

