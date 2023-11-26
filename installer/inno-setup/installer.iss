; Sample Inno Setup Script

[Setup]
AppName=Chat cli
AppVersion=1.0
DefaultDirName={pf}\Chat cli
DefaultGroupName=Chat cli
OutputDir=Output
OutputBaseFilename=Chat cli

[Files]
Source: "..\program\*"; DestDir: "{app}"

[Icons]
Name: "{group}\Chat cli"; Filename: "{app}\cli.exe"; IconFilename: "{app}\icon.ico"
Name: "{commondesktop}\Chat cli"; Filename: "{app}\cli.exe"; Flags: createonlyiffileexists; IconFilename: "{app}\icon.ico"