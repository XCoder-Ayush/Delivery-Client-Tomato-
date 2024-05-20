import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and set a flag to determine whether to show the header and footer
        this.shouldShowHeader();
        this.shouldShowFooter();
      }
    });
  }

  title = 'tomato-admin';

  openUserMenu() {
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuButton && userDropdown) {
      const isExpanded =
        userMenuButton.getAttribute('aria-expanded') === 'true';
      userMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());

      userDropdown.classList.toggle('hidden');
      if (!userDropdown.classList.contains('hidden')) {
        userDropdown.classList.add(
          'transition',
          'ease-out',
          'duration-100',
          'transform',
          'opacity-100',
          'scale-100'
        );
        userDropdown.classList.remove(
          'ease-in',
          'duration-75',
          'opacity-0',
          'scale-95'
        );
      } else {
        userDropdown.classList.add(
          'transition',
          'ease-in',
          'duration-75',
          'opacity-0',
          'scale-95'
        );
        userDropdown.classList.remove(
          'ease-out',
          'duration-100',
          'opacity-100',
          'scale-100'
        );
      }
    }
  }

  openSidebarTab(element: any) {
    const id = element.id;
    const tabb = document.getElementById(id) as HTMLElement;
    let listItems = document.querySelectorAll('.sidebar-tabs');
    if (listItems != null) {
      // console.log((listItems[0] as HTMLElement).classList);
      // console.log((listItems[1] as HTMLElement).classList);
      listItems.forEach((item) => {
        (item as HTMLElement).classList.remove('bg-red-700', 'text-white');
        (item as HTMLElement).classList.add('bg-white', 'text-black-900');
      });
      tabb.classList.remove('bg-white', 'text-black-900');
      tabb.classList.add('bg-red-700', 'text-white');
    }
  }

  shouldShowHeader() {
    const currentRoute = this.router.url;
    const flag1 = currentRoute !== '/auth';
    if (flag1 == false) {
      (document.querySelector('#show-auth') as HTMLElement).classList.remove(
        'sm:ml-56',
        'sm:mt-14'
      );
    } else if (
      !(document.querySelector('#show-auth') as HTMLElement).classList.contains(
        'sm:ml-56'
      ) &&
      !(document.querySelector('#show-auth') as HTMLElement).classList.contains(
        'sm:mt-14'
      )
    ) {
      (document.querySelector('#show-auth') as HTMLElement).classList.add(
        'sm:ml-56',
        'sm:mt-14'
      );
    }
    return flag1;
  }

  shouldShowFooter() {
    const currentRoute = this.router.url;
    const flag2 = currentRoute !== '/auth';
    // console.log((document.querySelector('#show-auth')as HTMLElement).classList);
    if (flag2 == false) {
      (document.querySelector('#show-auth') as HTMLElement).classList.remove(
        'sm:ml-56',
        'sm:mt-14'
      );
    } else if (
      !(document.querySelector('#show-auth') as HTMLElement).classList.contains(
        'sm:ml-56'
      ) &&
      !(document.querySelector('#show-auth') as HTMLElement).classList.contains(
        'sm:mt-14'
      )
    ) {
      (document.querySelector('#show-auth') as HTMLElement).classList.add(
        'sm:ml-56',
        'sm:mt-14'
      );
    }
    return flag2;
  }

  openhamburger() {
    (document.querySelector('#mobile-menu') as HTMLElement).classList.toggle(
      'hidden'
    );
  }
}
