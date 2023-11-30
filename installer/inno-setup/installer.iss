; Sample Inno Setup Script

[Setup]
AppName=Chat CLI
AppVersion=1.0
DefaultDirName={pf}\Chat CLI
DefaultGroupName=Chat CLI
OutputDir=Output
OutputBaseFilename=installer

[Files]
Source: "..\program\*"; DestDir: "{app}"

[Icons]
Name: "{group}\Chat CLI"; Filename: "{app}\cli.exe"; IconFilename: "{app}\icon.ico"
Name: "{commondesktop}\Chat CLI"; Filename: "{app}\cli.exe"; Flags: createonlyiffileexists; IconFilename: "{app}\icon.ico"