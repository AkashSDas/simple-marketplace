class Network {
    static getGetQuery(params) {
        let result = "";
        for (let key in params) {
            let value = params[key];
            if (!value || value.length === 0)
                continue;
            if (result.length === 0)
                result += "?";
            else
                result += "&";
            result += key + "=" + value;
        }
        return result;
    }
    static loadScript(url) {
        let script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
    }
    static loadStyle(url) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        link.media = "all";
        document.head.appendChild(link);
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvZWxlbWVudHMvbmV0d29yay9zY3JpcHRzL05ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDUyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQVc7UUFDbkMsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxTQUFTO1lBRTNDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7O2dCQUNsQyxNQUFNLElBQUksR0FBRyxDQUFDO1lBRW5CLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUM3QjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUc7UUFDMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1FBQ3pCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGIiwiZmlsZSI6InNyYy9jbGllbnQvZWxlbWVudHMvbmV0d29yay9zY3JpcHRzL05ldHdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOZXR3b3JrIHtcbiAgcHVibGljIHN0YXRpYyBnZXRHZXRRdWVyeShwYXJhbXM6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvciAobGV0IGtleSBpbiBwYXJhbXMpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkgcmVzdWx0ICs9IFwiP1wiO1xuICAgICAgZWxzZSByZXN1bHQgKz0gXCImXCI7XG5cbiAgICAgIHJlc3VsdCArPSBrZXkgKyBcIj1cIiArIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGxvYWRTY3JpcHQodXJsKSB7XG4gICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgc2NyaXB0LnNyYyA9IHVybDtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGxvYWRTdHlsZSh1cmwpIHtcbiAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLm1lZGlhID0gXCJhbGxcIjtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICB9XG59XG4iXX0=
