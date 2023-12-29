[Setup]
#define AppName "Chat CLI"

AppName={#AppName}
AppVersion=1.0
DefaultDirName={commonpf}\Chat CLI
DefaultGroupName=Chat CLI
OutputDir="..\dist"
OutputBaseFilename=installer

[Files]
Source: "..\program\*"; DestDir: "{app}"

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\cli.exe"; IconFilename: "{app}\icon.ico"
Name: "{commondesktop}\{#AppName}"; Filename: "{app}\cli.exe"; Flags: createonlyiffileexists; IconFilename: "{app}\icon.ico"
