import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class TestingUtils {
    public static findComponent<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
        return fixture.debugElement.query(By.css(selector));
    }
}