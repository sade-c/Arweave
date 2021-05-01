import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { ProfileService } from '../shared/services/profile.service';
import { KatlamaService } from '../shared/services/katlama.service';
import { Profile } from '../shared/models/profile';
import { Katlama } from '../shared/models/katlama';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public key: JWKInterface;

  public katlamaForm = this.fb.group({
    title: ['', Validators.required],
    tags: [''],
    destinationUrl: [''],
    youtubeUrl: [''],
    description: [''],
  });

  public profile: Profile;

  public imgFile: File;
  public imgPreviewUrl: SafeUrl;

  public loadingProfile = false;
  public publishingKatlama = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private katlamaService: KatlamaService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {}

  async publishKatlama(): Promise<void> {
    this.katlamaForm.markAllAsTouched();

    if (this.katlamaForm.invalid || !this.imgFile) return;

    const formValue = this.katlamaForm.value;

    const katlama: Partial<Katlama> = {
      title: formValue.title,
      profileId: this.profile.id,
      tags: (formValue.tags as string).split(',').map((t) => t.trim()),
      destinationUrl: formValue.destinationUrl,
      youtubeUrl: formValue.youtubeUrl,
      description: formValue.description,
    };

    this.publishingKatlama = true;
    this.katlamaForm.disable();

    const profileId = await this.profileService.getProfileIdFromKey(this.key);
    const katlamaId = await this.katlamaService.publishKatlama(katlama, this.imgFile, this.key);
    this.router.navigateByUrl(`/u/${profileId}/p/${katlamaId}/status`);
  }

  async handleKeyFile(files: FileList): Promise<void> {
    const key = JSON.parse(await files.item(0).text());

    this.loadingProfile = true;

    const profileId = await this.profileService.getProfileIdFromKey(key);
    this.profile = {
      id: profileId,
      
    };

    this.loadingProfile = false;
    this.key = key;
  }

  async handleImageFile(files: FileList): Promise<void> {
    this.imgFile = files.item(0);

    const imgReader = new FileReader();

    imgReader.onload = (e) =>
      (this.imgPreviewUrl = this.sanitizer.bypassSecurityTrustUrl(
        imgReader.result as string,
      ));

    imgReader.readAsDataURL(this.imgFile);
  }
}
