class HelperFunction {
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const format = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return format;
  }

  getFileSize(filePath: String) {
    let size = null;

    (window as any).fs.stat(filePath, (err: any, stats: any) => {
      if (err) {
        throw err;
      } else {
        size = this.formatBytes(stats.size / (1024 * 1024));
      }
    });
    return size;
  }

  formatDate(date: Date): string {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  }

  formatWeekDay(day: string): string {
    switch (day) {
      case "MO":
        return "Montag";
      case "DI":
        return "Dienstag";
      case "MI":
        return "Mittwoch";
      case "DO":
        return "Donnerstag";
      case "FR":
        return "Freitag";
      case "SA":
        return "Samstag";
      case "SO":
        return "Sontag";
    }
    return "";
  }
}

export const helperFunction: HelperFunction = new HelperFunction();
