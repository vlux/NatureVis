function L_system_2D

global mmonthday;
global mmonthapi;
global number
number=2;
x=xlsread('APISO2');
y=xlsread('API');
% monthday=monted(x);
% monthapi=monted(y);
%title('\fontsize{13} SO2');
aa=colormap;
colora=[.7 .7 0];
colora='y';
monthleng=[0,31,28,31,30,31,30,31,31,30,31,30];
mmonthleng=[31,28,31,30,31,30,31,31,30,31,30,31];
monthlength(1)=monthleng(1);
for i=2:length(monthleng)
    monthlength(i)=monthlength(i-1)+monthleng(i);
end
yearcont=10;
monthcont=12;
daycont=[31,28,31,30,31,30,31,31,30,31,30,31];
tempcont=1;
excellcont=zeros(yearcont,1);
wrost=zeros(yearcont,1);
prime=ones(yearcont,1);
for i=1:yearcont
     for j=1:monthcont
        for k=1:daycont(j)
            yy(i,j,k)=y(tempcont);
            xx(i,j,k)=x(tempcont);
            if x(tempcont)==y(tempcont)
                prime(i)=prime(i)+1;
            end
            if x(tempcont)<50||x(tempcont)==50
                excellcont(i)=excellcont(i)+1;
            else if x(tempcont)>100 
                    wrost(i)=wrost(i)+1;
                end
            end
            tempcont=tempcont+1;
            
        end
    end
end
%excellcont=excellcont/(max(excellcont));
prime=prime/max(prime);
%prime=prime.^(1/2);
for i=1:yearcont
    for j=1:monthcont
       monthday((i-1)*12+j,:)=xx(i,j,:);
        monthapi((i-1)*12+j,:)=yy(i,j,:);
    end
end
mmonthday=monthday;
mmonthapi=monthapi;
% all=normal([monthday,monthapi],0,1);
all=[monthday,monthapi];
all=all./(max(max(all)));
monthday=all(:,1:31);
monthapi=all(:,32:62);
global finalapix;
global finalapiy;
finaldayx=zeros(120,31);
finaldayy=zeros(120,31);
finalapix=zeros(120,31);
finalapiy=zeros(120,31);
%%
  alpha =30; % degrees (angle)

   length_F = 2;
   length_G = 0.5;
bemid='YFFFFFF';
bran1='MF';
bran2='DFFF';
branc1=[ bran1 '[+' bran2 'G]' bran1 '[-' bran2 'G]' ];
branc2=[ bran1 '[-' bran2 'G]' bran1 '[+' bran2 'G]' ];
branch1=['MF'];
branch2=['MF'];
month=12;
for i=1:month/2
    branch1=[branch1 branc1];
    branch2=[branch2 branc2];
end
cicle='MFFF[AFFFFFFFC]';
 axiom=[ bemid 'c[+'  branch1 cicle ']P' bemid  'c[-' branch2 cicle ']P' bemid  'c[+'  branch1 cicle ']P' bemid  'c[-' branch2 cicle ']P'...
     bemid  'c[+'  branch1 cicle ']P' bemid  'c[-' branch2 cicle ']P' bemid  'c[+'  branch1 cicle  ']P' ...
     bemid  'c[-' branch2 cicle ']P' bemid  'c[+'  branch1 cicle ']P' bemid  'c[-' branch2 cicle ']PL'];
xT=0;
yT = 0;
aT = pi/2;
da = alpha/180*pi; % convert deg to rad
stkPtr = 1;
cont=0;
hold on;
%flag=1;
yearflag=-1;
thet=0;
XXX=[];
YYY=[];
linwidth=2;
 cnumber=0;
for i = 1:length(axiom)
    cmdT = axiom(i);
    a(i)=aT;
    switch cmdT
    % It is possible to add multiple cases here
    % in order to expand the program.
        case 'A'%angle
            aT=3*pi/2;
            linwidth=2;
    case 'F'
        newxT = xT + length_F*cos(aT);
        newyT = yT + length_F*sin(aT);
        % plot characteristics of the line
        %line([yT newyT], [xT newxT],'color',[.3 .3 0], 'linewidth',2); 
        line([xT newxT],[yT newyT],'color','k', 'linewidth',linwidth); 
        xT = newxT;
        yT = newyT;
       % plot(xT,yT,'k.','Color','r');
        case 'c'
%         if flag==1
%         thet=linspace(0,2*pi,31);
%         flag=0;
%         else 
%             thet=linspace(-pi,pi,31);
%         flag=1;
%         end
%         thet=[thet,thet(1)];
        case 'C'%»­Ô²
             cnumber= cnumber+1;
             angle1=0;
             angle2=excellcont(cnumber)*2*pi/365;
             angle3=(365-excellcont(cnumber)-wrost(cnumber))*2*pi/365+angle2;
             angle4=2*pi;
             tempn=20;
              r=2*prime(cnumber);
              tempthet=linspace(angle1,angle2,tempn);
              cicleX=xT+r*cos(tempthet);
              cicleY=yT+r*sin(tempthet);
              cicleX=[cicleX,xT];
              cicleY=[cicleY,yT];
              fill(cicleX,cicleY,'m');
               tempthet=linspace(angle2,angle3,tempn);
              cicleX=xT+r*cos(tempthet);
              cicleY=yT+r*sin(tempthet);
               cicleX=[cicleX,xT];
              cicleY=[cicleY,yT];
              fill(cicleX,cicleY,'g');
               tempthet=linspace(angle3,angle4,tempn);
              cicleX=xT+r*cos(tempthet);
              cicleY=yT+r*sin(tempthet);
               cicleX=[cicleX,xT];
              cicleY=[cicleY,yT];
              fill(cicleX,cicleY,'c');
            
%             fill([xT,xT+r*cos(angle1),xT+r*cos(angle2)],[yT,yT+r*sin(angle1),yT+r*sin(angle2)],['r','r','r']);
%              pause(2);
%             fill([xT,xT+r*cos(angle2),xT+r*cos(angle3)],[yT,yT+r*sin(angle2),yT+r*sin(angle3)],'g');
%             pause(2);
%             fill([xT,xT+r*cos(angle3),xT+r*cos(angle1)],[yT,yT+r*sin(angle3),yT+r*sin(angle1)],'b');
%              pause(2);
     % pie([excellcont(cnumber),wrost(cnumber),365-excellcont(cnumber)-wrost(cnumber)]);
     
        case 'Y'
             linwidth=6;
        case 'M'
         linwidth=4;
        case 'D'
            linwidth=2;

            
    case 'G'
%         newxT = xT + length_G*cos(aT);
%         newyT = yT + length_G*sin(aT);
%         % plot characteristics of the line
%         line([xT newxT],[yT newyT],'color','g', 'linewidth',2); 
%         xT = newxT;
%         yT = newyT;
     cont=cont+1;
     moth=mod(cont,12);
     if moth==0
         moth=12;
     end
    contvar=mmonthleng(moth);
    tempp=ones(1,contvar);
    tempy=ones(1,contvar);
     th=0:2*pi/(contvar):2*pi;
 
  xxx=xT+monthday(cont,1:contvar)*5.*cos(th(1:contvar));
  yyy=yT+monthday(cont,1:contvar)*5.*sin(th(1:contvar));
  xy=xT+monthapi(cont,1:contvar)*5.*cos(th(1:contvar));
  yy=yT+monthapi(cont,1:contvar)*5.*sin(th(1:contvar));
  finaldayx(cont,1:contvar)=xxx;
  finaldayy(cont,1:contvar)=yyy;
  finalapix(cont,1:contvar)=xy;
  finalapiy(cont,1:contvar)=yy;
  xxx=[xxx,xxx(1)];
 yyy=[yyy,yyy(1)];
xy=[xy,xy(1)];
yy=[yy,yy(1)];
 fill(xy,yy,aa(33,:));
 
   for i=1:contvar+1
      line([xT,xy(i)],[yT,yy(i)],'Color','g');
   end
fill(xxx,yyy,aa(50,:));
  for i=1:contvar+1
      line([xT,xxx(i)],[yT,yyy(i)],'Color',aa(55,:));
     
  end
 
     case '+' % rotate anticlockwise 
        aT = aT - da;
    case '-' % rotate clockwise
        aT = aT + da;
    case '[' % save current position
        stack(stkPtr).xT = xT ;
        stack(stkPtr).yT = yT ;
        stack(stkPtr).aT = aT ;
        stkPtr = stkPtr +1 ;
    case ']' % return to former position (last save)
        stkPtr = stkPtr -1 ;
        xT = stack(stkPtr).xT ;
        yT = stack(stkPtr).yT ;
        aT = stack(stkPtr).aT ;
    case 'P'
           

                  XXX=[XXX,xT];
                  YYY=[YYY,yT];
            for i=1:12
                ll(i)=2*i+2;
                xTT(i)=xT+ll(i)*cos(aT+yearflag*da);
                yTT(i)=yT+ll(i)*sin(aT+yearflag*da);
            end
                constant=8;
               for i=1:31
                   mday=monthday(cont-11:cont,:);
                   
               plot(xTT(1:2:11)'+mday(1:2:11,i).*cos(aT+yearflag*2*da)*constant,yTT(1:2:11)'+mday(1:2:11,i).*sin(aT+yearflag*2*da)*constant,'Color',colora,'linewidth',1);
                plot(xTT(2:2:12)'+mday(2:2:12,i).*cos(aT)*constant,yTT(2:2:12)'+mday(2:2:12,i).*sin(aT)*constant,'Color',colora,'linewidth',1);
               end
               yearflag=-yearflag;
            
        case 'L'
            cccont=1;
            for i=1:120
                for j=1:31
                    sumday(cccont)=monthday(i,j);
                    cccont=cccont+1;   
                end
            end
            cccont=1;
              for i=1:10
                  for j=1:31*12
                   yday(i,j)=sumday(cccont);
                   cccont=cccont+1;
%                    XXX=[XXX;XXX];
%                    YYY=[YYY;YYY];
                  end
              end
                   XXX=XXX';
                   YYY=YYY';
                   XX=ones(10,372);
                   YY=ones(10,372);
                    XX=XXX*ones(1,372);
                   YY=YYY*ones(1,372);
                   constant=8;
               plot(XX(1:2:10,:)+yday(1:2:10,:).*cos(aT-da)*constant,YY(1:2:10,:)+yday(1:2:10,:).*sin(aT-da)*constant,'Color',colora,'linewidth',2);
               plot(XX(2:2:10,:)+yday(2:2:10,:).*cos(aT+da)*constant,YY(2:2:10,:)+yday(2:2:10,:).*sin(aT+da)*constant,'Color',colora,'linewidth',2);

                %plot(xTT(2:2:12)'+mday(2:2:12,i).*cos(aT)*constant,yTT(2:2:12)'+mday(2:2:12,i).*sin(aT)*constant,'Color','g');
               
    otherwise
        disp('error');
        return
    end
    % draw now
end
%a=a.*180/pi;
%shading flat
xlim([-20,20]);
%ylim([0,136]);
axis square;
%view(90,-90);
% sets data aspect ratio
%daspect([1,1,1]);
%legend('I', 'II', '\geq III','location','NorthEastOutside' );
axis off;
%grid minor
set(datacursormode,'UpdateFcn',@NewCallback);