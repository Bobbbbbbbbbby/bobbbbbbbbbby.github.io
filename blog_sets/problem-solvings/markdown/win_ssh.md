# 使用SSH连接Windows
这篇blog用来记录如何用ssh连接到Windows并使用powershell

## 安装功能
打开开始菜单，直接搜索“可选功能”，在设置中新增功能**SSH服务器**

完成安装之后需要启动和设置自启动服务（注意：需要管理员权限）：
```ps
# Start the sshd service
Start-Service sshd

# OPTIONAL but recommended:
Set-Service -Name sshd -StartupType 'Automatic'

# Confirm the Firewall rule is configured. It should be created automatically by setup. Run the following to verify
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}
```

此时可以开始在可访问的网络上连接Windows

连接上之后，我们使用的是cmd.exe而不是powershell

## 使用powershell
在Windows电脑上，以管理员身份运行以下代码可以将ssh连接变为powershell：
```ps
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```