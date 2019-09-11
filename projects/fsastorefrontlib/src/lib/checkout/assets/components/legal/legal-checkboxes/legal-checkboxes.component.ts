import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FSCheckoutConfigService } from '../../../services';

@Component({
  selector: 'fsa-legal-checkboxes',
  templateUrl: './legal-checkboxes.component.html'
})
export class LegalCheckboxesComponent implements OnInit {

  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    private activatedRoute: ActivatedRoute,
    private checkoutConfigService: FSCheckoutConfigService,
  ) { }

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
  }

  next() {
    this.routingService.go(this.checkoutStepUrlNext);
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }

}


