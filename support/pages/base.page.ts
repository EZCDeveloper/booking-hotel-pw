export class BasePage {
    constructor(protected page: any) { }

    async navigateTo(path: string) {
        await this.page.goto(`${process.env.BASE_URL}${path}`);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}
