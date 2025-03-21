
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export const SettingsPanel = () => {
  const [emailSettings, setEmailSettings] = useState({
    enableAutoReminders: true,
    enableDigestEmails: true,
    enforceMFA: false
  });

  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="emails">Email Settings</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>
              Manage general platform configuration and appearance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="platform-name" className="text-base">Platform Name</Label>
                  <p className="text-sm text-muted-foreground">
                    This will be displayed throughout the application
                  </p>
                </div>
                <Input 
                  id="platform-name" 
                  defaultValue="ProBidHub" 
                  className="w-[180px]" 
                />
              </div>
              <Separator />
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode" className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode for all users
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              <Separator />
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="new-registrations" className="text-base">New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to sign up to the platform
                  </p>
                </div>
                <Switch id="new-registrations" defaultChecked />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security policies and access controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="enforce-mfa" className="text-base">Enforce MFA</Label>
                  <p className="text-sm text-muted-foreground">
                    Require all users to set up multi-factor authentication
                  </p>
                </div>
                <Switch 
                  id="enforce-mfa" 
                  checked={emailSettings.enforceMFA}
                  onCheckedChange={(checked) => 
                    setEmailSettings({...emailSettings, enforceMFA: checked})
                  }
                />
              </div>
              <Separator />
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="password-expiry" className="text-base">Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">
                    Days until passwords expire and need to be changed
                  </p>
                </div>
                <Input 
                  id="password-expiry" 
                  type="number" 
                  defaultValue="90" 
                  className="w-[100px]" 
                />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="emails">
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
            <CardDescription>
              Configure system emails and notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="auto-reminders" className="text-base">Auto Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic bid reminders to subcontractors
                  </p>
                </div>
                <Switch 
                  id="auto-reminders" 
                  checked={emailSettings.enableAutoReminders}
                  onCheckedChange={(checked) => 
                    setEmailSettings({...emailSettings, enableAutoReminders: checked})
                  }
                />
              </div>
              <Separator />
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="digest-emails" className="text-base">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Send weekly platform activity summary to admins
                  </p>
                </div>
                <Switch 
                  id="digest-emails" 
                  checked={emailSettings.enableDigestEmails}
                  onCheckedChange={(checked) => 
                    setEmailSettings({...emailSettings, enableDigestEmails: checked})
                  }
                />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>API & Integrations</CardTitle>
            <CardDescription>
              Manage API keys and third-party integrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">API Keys</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage access tokens for external applications.
                </p>
                <Button variant="outline">Generate New API Key</Button>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-lg font-medium">Connected Services</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage integrations with external services.
                </p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Connect Google Drive
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Connect LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
