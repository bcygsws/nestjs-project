import {Injectable} from '@nestjs/common';
import {CreateWebcrawlerDto} from './dto/create-webcrawler.dto';
import {UpdateWebcrawlerDto} from './dto/update-webcrawler.dto';
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class WebcrawlerService {
    create(createWebcrawlerDto: CreateWebcrawlerDto) {
        return 'This action adds a new webcrawler';
    }

    findAll() {
        const baseUrl = 'https://www.jpmn5.com'
        const next = '下一页'
        let index = 0;
        const urls: string[] = []
        const getCosPlay = async () => {
            console.log(index)
            await axios.get(`https://www.jpmn5.com/Cosplay/Cosplay10772${index ? '_' + index : ''}.html`).then(async res => {
                //console.log(res.data)
                const $ = cheerio.load(res.data);
                const page = $('.article-content .pagination a').map(function () {
                    return $(this).text();
                }).toArray()
                if (page.includes(next)) {
                    $('.article-content p img').each(function () {
                        console.log($(this).attr('src'))
                        urls.push(baseUrl + $(this).attr('src'))
                    })
                    index++
                    await getCosPlay()
                }
            })
        }
        getCosPlay();
        this.writeFile(urls);
        console.log(urls)
        return `This action returns all webcrawler`;
    }

    writeFile(urls: string[]) {
        urls.forEach(async url => {
            const buffer = await axios.get(url, {responseType: "arraybuffer"}).then(res => res.data)
            const ws = fs.createWriteStream(path.join(__dirname, '../cos' + new Date().getTime() + '.jpg'))
            ws.write(buffer)
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} webcrawler`;
    }

    update(id: number, updateWebcrawlerDto: UpdateWebcrawlerDto) {
        return `This action updates a #${id} webcrawler`;
    }

    remove(id: number) {
        return `This action removes a #${id} webcrawler`;
    }
}
