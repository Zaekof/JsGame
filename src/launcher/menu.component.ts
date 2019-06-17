export class LauncherMenu {

  public btn = [
    "Launch",
    "Settings",
    "Quit",
  ];

  public social = {
    twitter: "twitter.tv/zaekof",
  };

  private btnIndex: number = 0;
  private firstLaunch: boolean = true;

  public test(): void {
    // tslint:disable-next-line: no-console
    console.log("test");
  }
}
