import { Injectable } from '@nestjs/common';
import { Blog } from './blogs.interface';

@Injectable()
export class BlogsService {
  private readonly blogs: Blog[] = [
    {
      title: '<p>What is a clean code  and how to write it</p>',
      description:
        '<p>Coding is not only writting code but it’s also writting code which is  readable, reliable, maintenable, reusable , portable and reusable.\n' +
        'Writting clean code is important because it reduces time you spend debuging or even coding new functionalities. At the other end poor code may results in increasing financial costs as the average developer spends 42% of their time dealing with technical debt and maintenance issues\n' +
        '\n</p>',
      content:
        '<p>Coding is not only writting code but it’s also writting code which is  readable, reliable, maintenable, reusable , portable and reusable.</p>' +
        '<h2>Why clean code  matters</h2> <p>Writting clean code is important because it reduces time you spend debuging or even coding new functionalities.' +
        ' At the other end poor code may results in increasing financial costs as the average developer spends 42% of their time dealing with technical debt and maintenance issues.`</p>',
      image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      date: new Date(),
      feedbacks: [
        {
          name: 'Yves Sheja',
          message:
            '<p>Thank you, it was helpful i found also that writting clean code is important because it reduces \n' +
            'time you spend debuging. At the other end poor code may results in increasing financial costs\n' +
            'as the average developer spends 42% of their time dealing with technical debt and\n' +
            'maintenance issues. </p>',
        },
        {
          name: 'Bob',
          message:
            '<p>Thank you, it was helpful i found also that writting clean code is important because it reduces \n' +
            'time you spend debuging. At the other end poor code may results in increasing financial costs\n' +
            'as the average developer spends 42% of their time dealing with technical debt and\n' +
            'maintenance issues. </p>',
        },
      ],
    },
  ];

  public findAll(): Blog[] {
    return this.blogs;
  }
}
