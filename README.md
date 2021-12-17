# chemedata-workshop

*This repository is temporary and features will be re-organized in the future*

This repository is deployed on the [CHEMeDATA](http://jelastic.chemedata.org/) website.
Please post a [GitHub Issue](https://github.com/CHEMeDATA/chemedata-workshop/issues/new) if you have comments or want to report problems.

## Installation

Clone the project and install with

`npm i`

## Start 

`npm start`

With your browser go to : http://localhost:8080/.

## Open Babel 

Install [open babel](https://www.npmjs.com/package/openbabel) according to your environment:

OS X installation
```
brew install open-babel
```

Linux installation 

```
sudo apt-get install libopenbabel-dev
```

OR

```
sudo yum install libopenbabel-dev
```

Installation with no root access

[Installation](https://docs.jelastic.com/environment-import) of the [libopenababel-lib](https://www.npmjs.com/package/openbabel) on a jelastic server required the [Yum package installer Add-On](https://github.com/jelastic-jps/packages-installer) to avoid the need of root priviledge.

## Usage 

### Convert .cdxml to .sdf 
Run conversion from local server
```
curl -T  ./molecules/structure.cdxml -X POST -H "Content-Type: text/plain" http://localhost:8080/cdxml2mol -o structure.sdf
 
```

Run conversion on the CHEMeDATA server :
```csh

curl --upload-file ./molecules/structure.cdxml -X POST -H "Content-Type: text/plain" http://jelastic.chemedata.org/cdxml2mol -o convertedStructure.sdf
#curl --upload-file "{file1,file2}" http://www.example.com//
Workin on...

curl --data-binary  --upload-file ./molecules/benzoic.cdx -X POST -H "Content-Type: application/zip" http://jelastic.chemedata.org/cdx2mol -o convertedStructure222.sdf

```

**Note:** Stucture Data Format files (.sdf) are compatible with mol files.

**Coming up...** Conversion of other chemistry structure format! The files in .cdx format are binary and cannot be converted at this time.


