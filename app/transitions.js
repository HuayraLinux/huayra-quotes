export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('search'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('categories'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.fromRoute('categories'),
    this.toRoute('search'),
    this.use('fade'),
    this.reverse('fade')
  );
}
