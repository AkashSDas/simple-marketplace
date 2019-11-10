class CopyText {
    static toClipboard(text) {
        if (!navigator.clipboard) {
            CopyText.copyToClipboardFallback(text);
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
        }, error => {
            CopyText.copyToClipboardFallback(text);
        });
    }
    static copyToClipboardFallback(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvZWxlbWVudHMvY29weS10ZXh0L3NjcmlwdHMvQ29weVRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDUyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQVk7UUFDcEMsSUFBSSxDQUFPLFNBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDL0IsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE9BQU87U0FDUjtRQUNLLFNBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0MsR0FBRyxFQUFFO1FBRUwsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFO1lBQ04sUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFZO1FBQ2pELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUdwQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRXhHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3BDLElBQUksUUFBUSxFQUFFO1lBQ1osUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0NBQ0YiLCJmaWxlIjoic3JjL2NsaWVudC9lbGVtZW50cy9jb3B5LXRleHQvc2NyaXB0cy9Db3B5VGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvcHlUZXh0IHtcbiAgcHVibGljIHN0YXRpYyB0b0NsaXBib2FyZCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBpZiAoISg8YW55Pm5hdmlnYXRvcikuY2xpcGJvYXJkKSB7XG4gICAgICBDb3B5VGV4dC5jb3B5VG9DbGlwYm9hcmRGYWxsYmFjayh0ZXh0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKDxhbnk+bmF2aWdhdG9yKS5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpLnRoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIElnbm9yZVxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgQ29weVRleHQuY29weVRvQ2xpcGJvYXJkRmFsbGJhY2sodGV4dCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNvcHlUb0NsaXBib2FyZEZhbGxiYWNrKHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgIHRleHRBcmVhLnZhbHVlID0gdGV4dDtcbiAgICB0ZXh0QXJlYS5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcIlwiKTtcbiAgICB0ZXh0QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICB0ZXh0QXJlYS5zdHlsZS5sZWZ0ID0gXCItOTk5OXB4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG5cbiAgICAvLyBSZW1lbWJlciBleGlzdGluZyBzZWxlY3Rpb25cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJhbmdlQ291bnQgPiAwID8gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKSA6IGZhbHNlO1xuXG4gICAgdGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xuXG4gICAgLy8gSWYgYSBzZWxlY3Rpb24gZXhpc3RlZCBiZWZvcmUgY29weWluZywgdW5zZWxlY3QgZXZlcnl0aGluZyBvbiB0aGUgSFRNTCBkb2N1bWVudCBhbmQgcmVzdG9yZSB0aGUgb3JpZ2luYWwgc2VsZWN0aW9uXG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLmFkZFJhbmdlKHNlbGVjdGVkKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
