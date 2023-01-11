export class GlobalFunction {
  static convertDate(date : string){
    // var convDate = new Date(date).toLocaleDateString('fa-Ir');
    var convDate = new Date(date)
    var fdate = convDate.getFullYear() + '/' + ("0" + (convDate.getMonth() + 1)).slice(-2) + '/' + ("0" + convDate.getDate()).slice(-2);
    return fdate
  }
}
