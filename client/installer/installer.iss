; Sample Inno Setup Script

[Setup]
AppName=chatcli
AppVersion=1.0
DefaultDirName={pf}\chatcli
DefaultGroupName=chatcli
OutputDir=Output
OutputBaseFilename=chatcli

[Files]
Source: "C:\Users\feder\Desktop\me\chat-cli\client\exe\*"; DestDir: "{app}"

[Icons]
Name: "{group}\chatcli"; Filename: "{app}\cli-win.exe"
