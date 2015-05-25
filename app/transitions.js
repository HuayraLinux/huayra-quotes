export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('search'),
    this.use('fade'),
    this.reverse('fade')
  );
}
