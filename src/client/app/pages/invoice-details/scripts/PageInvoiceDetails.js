class PageInvoiceDetails {
    constructor(listener) {
        this.listener = listener;
    }
    getPageId() {
        return "page-invoice";
    }
    execute() {
        $(".btn-copy")
            .off("click")
            .on("click", event => {
            const button = $(event.currentTarget);
            const email = button.attr("data-copy");
            CopyText.toClipboard(email);
        });
        this.loadStipeData();
        this.setupStripeCheckout();
        this.setupNewCardOption();
        if (this.isCardPaymentPending) {
            this.refreshPageInAMonent();
        }
    }
    closePage() { }
    onDialogClosed() { }
    refreshPageInAMonent() {
        const refreshPageDelayMs = 3000;
        const self = this;
        setTimeout(() => {
            self.listener.reloadPage();
        }, refreshPageDelayMs);
    }
    enableForm() {
        this.listener.hideLoading();
        $(".btn-payment").removeAttr("disabled");
    }
    disableForm() {
        this.listener.showLoading();
        $(".btn-payment").attr("disabled", "true");
    }
    loadStipeData() {
        this.stripePublishableApiKey = $("input[name='stripePublishableKey'").val();
        this.invoiceId = $("input[name='invoiceId'").val();
        this.invoiceTitle = $("input[name='invoiceTitle'").val();
        this.invoiceDescription = $("input[name='invoiceDescription'").val();
        this.invoiceTotalAmount = $("input[name='invoiceTotalAmount'").val();
        this.isCardPaymentPending = $("input[name='isCardPaymentPending'").val() === "true";
    }
    pickNewCard() {
        this.stripeCheckoutHandler.open({
            name: this.invoiceTitle,
            description: this.invoiceDescription,
            zipCode: true,
            amount: parseInt(this.invoiceTotalAmount)
        });
    }
    setupNewCardOption() {
        const self = this;
        $(".btn-pay-card")
            .off("click")
            .on("click", event => {
            let disabled = $(".btn-pay-card:first").attr("disabled");
            if (disabled)
                return;
            self.pickNewCard();
            event.preventDefault();
        });
    }
    onCardProcessedSuccessfully(url) {
        const self = this;
        if (url) {
            window.location.replace(url);
        }
        else {
            this.enableForm();
            this.listener.hideFullPageLoading();
            $(".msg-error").remove();
            $(".payment-info").remove();
            $(".btn-payment").remove();
            $(".msg-payment-succeeded").removeClass("hide");
            const reloadTimeoutMs = 1500;
            setTimeout(() => {
                self.listener.reloadPage();
            }, reloadTimeoutMs);
        }
    }
    onCardProcessedFailed(responseText) {
        this.enableForm();
        this.listener.hideFullPageLoading();
        $(".msg-error").removeClass("hide");
        try {
            responseText = JSON.parse(responseText);
        }
        catch (error) {
        }
        if (responseText.msg)
            responseText = responseText.msg;
        $(".msg-error-custom:first").html(responseText);
        this.enableForm();
    }
    setupStripeCheckout() {
        const self = this;
        self.stripeCheckoutHandler = StripeCheckout.configure({
            key: this.stripePublishableApiKey,
            image: window.location.protocol + "//" + window.location.host + "/src/client/app/main/assets/favicon-144.png",
            locale: "auto",
            token: function (token) {
                self.disableForm();
                self.listener.showFullPageLoading("Processing payment");
                $.ajax({
                    url: "/api/v1/payment/charge",
                    method: "POST",
                    data: {
                        stripeToken: token,
                        invoiceId: self.invoiceId
                    }
                })
                    .done(function (properties) {
                    self.onCardProcessedSuccessfully(properties.url);
                })
                    .fail(function (jqXHR, textStatus) {
                    self.onCardProcessedFailed(jqXHR.responseText);
                });
            }
        });
        window.addEventListener("popstate", function () {
            self.stripeCheckoutHandler.close();
        });
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvYXBwL3BhZ2VzL2ludm9pY2UtZGV0YWlscy9zY3JpcHRzL1BhZ2VJbnZvaWNlRGV0YWlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQVdFLFlBQVksUUFBcUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBS00sT0FBTztRQUNaLENBQUMsQ0FBQyxXQUFXLENBQUM7YUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ1osRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFTSxTQUFTLEtBQUksQ0FBQztJQUVkLGNBQWMsS0FBSSxDQUFDO0lBRWxCLG9CQUFvQjtRQUMxQixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDekIs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SUFBSSxDQUFDLFVBQVMsVUFBVTtvQkFDdkIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxVQUFTLEtBQUssRUFBRSxVQUFVO29CQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7U0FDRixDQUFDLENBQUM7UUFHSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9wYWdlcy9pbnZvaWNlLWRldGFpbHMvc2NyaXB0cy9QYWdlSW52b2ljZURldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIGNvbnN0IFN0cmlwZUNoZWNrb3V0OiBhbnk7XG5cbmNsYXNzIFBhZ2VJbnZvaWNlRGV0YWlscyB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IEFwcExpc3RlbmVyO1xuXG4gIHByaXZhdGUgc3RyaXBlUHVibGlzaGFibGVBcGlLZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBpbnZvaWNlSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBpbnZvaWNlVGl0bGU6IGFueTtcbiAgcHJpdmF0ZSBpbnZvaWNlRGVzY3JpcHRpb246IGFueTtcbiAgcHJpdmF0ZSBpbnZvaWNlVG90YWxBbW91bnQ6IGFueTtcbiAgcHJpdmF0ZSBpc0NhcmRQYXltZW50UGVuZGluZzogYW55O1xuICBwcml2YXRlIHN0cmlwZUNoZWNrb3V0SGFuZGxlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGxpc3RlbmVyOiBBcHBMaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYWdlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJwYWdlLWludm9pY2VcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWluIGV4ZWN1dGlvbiBtZXRob2QgdG8gc2V0IHVwIHBhZ2UgYmVoYXZpb3VyXG4gICAqL1xuICBwdWJsaWMgZXhlY3V0ZSgpIHtcbiAgICAkKFwiLmJ0bi1jb3B5XCIpXG4gICAgICAub2ZmKFwiY2xpY2tcIilcbiAgICAgIC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgZW1haWwgPSBidXR0b24uYXR0cihcImRhdGEtY29weVwiKTtcbiAgICAgICAgQ29weVRleHQudG9DbGlwYm9hcmQoZW1haWwpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmxvYWRTdGlwZURhdGEoKTtcbiAgICB0aGlzLnNldHVwU3RyaXBlQ2hlY2tvdXQoKTtcbiAgICB0aGlzLnNldHVwTmV3Q2FyZE9wdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuaXNDYXJkUGF5bWVudFBlbmRpbmcpIHtcbiAgICAgIHRoaXMucmVmcmVzaFBhZ2VJbkFNb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2VQYWdlKCkge31cblxuICBwdWJsaWMgb25EaWFsb2dDbG9zZWQoKSB7fVxuXG4gIHByaXZhdGUgcmVmcmVzaFBhZ2VJbkFNb25lbnQoKSB7XG4gICAgY29uc3QgcmVmcmVzaFBhZ2VEZWxheU1zID0gMzAwMDtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYubGlzdGVuZXIucmVsb2FkUGFnZSgpO1xuICAgIH0sIHJlZnJlc2hQYWdlRGVsYXlNcyk7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZUZvcm0oKSB7XG4gICAgdGhpcy5saXN0ZW5lci5oaWRlTG9hZGluZygpO1xuICAgICQoXCIuYnRuLXBheW1lbnRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlRm9ybSgpIHtcbiAgICB0aGlzLmxpc3RlbmVyLnNob3dMb2FkaW5nKCk7XG4gICAgJChcIi5idG4tcGF5bWVudFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU3RpcGVEYXRhKCkge1xuICAgIHRoaXMuc3RyaXBlUHVibGlzaGFibGVBcGlLZXkgPSAkKFwiaW5wdXRbbmFtZT0nc3RyaXBlUHVibGlzaGFibGVLZXknXCIpLnZhbCgpO1xuICAgIHRoaXMuaW52b2ljZUlkID0gJChcImlucHV0W25hbWU9J2ludm9pY2VJZCdcIikudmFsKCk7XG4gICAgdGhpcy5pbnZvaWNlVGl0bGUgPSAkKFwiaW5wdXRbbmFtZT0naW52b2ljZVRpdGxlJ1wiKS52YWwoKTtcbiAgICB0aGlzLmludm9pY2VEZXNjcmlwdGlvbiA9ICQoXCJpbnB1dFtuYW1lPSdpbnZvaWNlRGVzY3JpcHRpb24nXCIpLnZhbCgpO1xuICAgIHRoaXMuaW52b2ljZVRvdGFsQW1vdW50ID0gJChcImlucHV0W25hbWU9J2ludm9pY2VUb3RhbEFtb3VudCdcIikudmFsKCk7XG4gICAgdGhpcy5pc0NhcmRQYXltZW50UGVuZGluZyA9ICQoXCJpbnB1dFtuYW1lPSdpc0NhcmRQYXltZW50UGVuZGluZydcIikudmFsKCkgPT09IFwidHJ1ZVwiO1xuICB9XG5cbiAgcHJpdmF0ZSBwaWNrTmV3Q2FyZCgpIHtcbiAgICB0aGlzLnN0cmlwZUNoZWNrb3V0SGFuZGxlci5vcGVuKHtcbiAgICAgIG5hbWU6IHRoaXMuaW52b2ljZVRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuaW52b2ljZURlc2NyaXB0aW9uLFxuICAgICAgemlwQ29kZTogdHJ1ZSxcbiAgICAgIGFtb3VudDogcGFyc2VJbnQodGhpcy5pbnZvaWNlVG90YWxBbW91bnQpXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTmV3Q2FyZE9wdGlvbigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICQoXCIuYnRuLXBheS1jYXJkXCIpXG4gICAgICAub2ZmKFwiY2xpY2tcIilcbiAgICAgIC5vbihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gJChcIi5idG4tcGF5LWNhcmQ6Zmlyc3RcIikuYXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAvLyBPcGVuIENoZWNrb3V0IHdpdGggZnVydGhlciBvcHRpb25zOlxuICAgICAgICBzZWxmLnBpY2tOZXdDYXJkKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25DYXJkUHJvY2Vzc2VkU3VjY2Vzc2Z1bGx5KHVybCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICh1cmwpIHtcbiAgICAgIC8vIE9wZW4gcmVxdWlyZWQgVVJMXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQYXltZW50IHdhcyBwcm9jZXNzZWRcbiAgICAgIHRoaXMuZW5hYmxlRm9ybSgpO1xuICAgICAgdGhpcy5saXN0ZW5lci5oaWRlRnVsbFBhZ2VMb2FkaW5nKCk7XG4gICAgICAkKFwiLm1zZy1lcnJvclwiKS5yZW1vdmUoKTtcbiAgICAgICQoXCIucGF5bWVudC1pbmZvXCIpLnJlbW92ZSgpO1xuICAgICAgJChcIi5idG4tcGF5bWVudFwiKS5yZW1vdmUoKTtcbiAgICAgICQoXCIubXNnLXBheW1lbnQtc3VjY2VlZGVkXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgICAgY29uc3QgcmVsb2FkVGltZW91dE1zID0gMTUwMDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZWxmLmxpc3RlbmVyLnJlbG9hZFBhZ2UoKTtcbiAgICAgIH0sIHJlbG9hZFRpbWVvdXRNcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkNhcmRQcm9jZXNzZWRGYWlsZWQocmVzcG9uc2VUZXh0KSB7XG4gICAgdGhpcy5lbmFibGVGb3JtKCk7XG4gICAgdGhpcy5saXN0ZW5lci5oaWRlRnVsbFBhZ2VMb2FkaW5nKCk7XG4gICAgJChcIi5tc2ctZXJyb3JcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlVGV4dCA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLyogSWdub3JlICovXG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlVGV4dC5tc2cpIHJlc3BvbnNlVGV4dCA9IHJlc3BvbnNlVGV4dC5tc2c7XG4gICAgJChcIi5tc2ctZXJyb3ItY3VzdG9tOmZpcnN0XCIpLmh0bWwocmVzcG9uc2VUZXh0KTtcbiAgICB0aGlzLmVuYWJsZUZvcm0oKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTdHJpcGVDaGVja291dCgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuc3RyaXBlQ2hlY2tvdXRIYW5kbGVyID0gU3RyaXBlQ2hlY2tvdXQuY29uZmlndXJlKHtcbiAgICAgIGtleTogdGhpcy5zdHJpcGVQdWJsaXNoYWJsZUFwaUtleSxcbiAgICAgIGltYWdlOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3NyYy9jbGllbnQvYXBwL21haW4vYXNzZXRzL2Zhdmljb24tMTQ0LnBuZ1wiLFxuICAgICAgbG9jYWxlOiBcImF1dG9cIixcbiAgICAgIHRva2VuOiBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBzZWxmLmRpc2FibGVGb3JtKCk7XG4gICAgICAgIHNlbGYubGlzdGVuZXIuc2hvd0Z1bGxQYWdlTG9hZGluZyhcIlByb2Nlc3NpbmcgcGF5bWVudFwiKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIHVybDogXCIvYXBpL3YxL3BheW1lbnQvY2hhcmdlXCIsXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzdHJpcGVUb2tlbjogdG9rZW4sXG4gICAgICAgICAgICBpbnZvaWNlSWQ6IHNlbGYuaW52b2ljZUlkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHNlbGYub25DYXJkUHJvY2Vzc2VkU3VjY2Vzc2Z1bGx5KHByb3BlcnRpZXMudXJsKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBzZWxmLm9uQ2FyZFByb2Nlc3NlZEZhaWxlZChqcVhIUi5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ2xvc2UgQ2hlY2tvdXQgb24gcGFnZSBuYXZpZ2F0aW9uOlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnN0cmlwZUNoZWNrb3V0SGFuZGxlci5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
